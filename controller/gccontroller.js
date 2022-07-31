const GarbageCollector = require('../models/gcmodel')
const gcTransaction = require('../models/gcTransaction')
const Orders = require('../models/ordermodel')
const ConfirmedOrder = require('../models/confirmedOrder')
const User = require('../models/usermodel')
const UserTransaction = require('../models/userTransaction')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.gclogin = (req, res) => {
  GarbageCollector.findOne({ email: req.body.email }).then(async (gc) => {
    if (!gc) {
      return res.status(404).send("Garbage Collector Not Found")
    }
    const isMatch = await bcrypt.compare(req.body.password, gc.password)
    if (!isMatch) {
      return res.status(400).send("Password Not Match")
    }
    const token = await jwt.sign({ gcId: gc._id }, process.env.GC_JWT_SECERET)
    return res.status(200).send({ "gc": gc, "token": token })
  }).catch(e => {
    return res.status(400).send(e)
  })
}

exports.getGCById = async (req, res) => {
  try {
    const gc = await GarbageCollector.findById(req.gc._id)
    if (gc) {
      return res.status(200).send(gc)
    }
  }
  catch (e) {
    return res.status(400).send(e)
  }
}

exports.logout = (req, res) => {
  res.status(200).send("logged out");
}

exports.gctransaction = async (req, res) => {
  try {
    await gcTransaction.find({ gcId: req.gc._id }).then(transactions => {
      return res.status(200).send(transactions)
    })
  } catch (error) {
    return res.status(400).send(error)
  }
}

exports.todaypickup = async (req, res) => {
  try {
    const todayDate = new Date().getDate()
    const todayMonth = new Date().getMonth()
    const todayYear = new Date().getFullYear()
    const td = `${todayDate}/${todayMonth + 1}/${todayYear}`
    await Orders.find({ city: req.gc.city, status: 'pending' }).then(orders => {
      const to = orders.filter(order => order.pickupslot.split(' ')[0] === td)
      const fso = to.filter(ord => ord.pickupslot.split(' ')[1] === '09')
      const sso = to.filter(ord => ord.pickupslot.split(' ')[1] === '02')
      const resord = fso.concat(sso)
      return res.status(200).send(resord)
    })
  } catch (e) {
    return res.status(400).send(e)
  }

}

exports.tommorowpickup = async (req, res) => {
  try {
    const d = new Date()
    const nd = new Date(d.getTime() + (24 * 60 * 60 * 1000))
    const tomDate = nd.getDate()
    const tomMonth = nd.getMonth()
    const tomYear = nd.getFullYear()
    const tod = `${tomDate}/${tomMonth + 1}/${tomYear}`
    await Orders.find({ city: req.gc.city, status: 'pending' }).then(orders => {
      const to = orders.filter(order => order.pickupslot.split(' ')[0] === tod)
      const fso = to.filter(ord => ord.pickupslot.split(' ')[1] === '09')
      const sso = to.filter(ord => ord.pickupslot.split(' ')[1] === '02')
      const resord = fso.concat(sso)
      return res.status(200).send(resord)
    })
  } catch (e) {
    return res.status(400).send(e)
  }
}

exports.previouspendingorder = async (req, res) => {
  try {
    const todayDate = new Date().getDate()
    const todayMonth = new Date().getMonth()
    const todayYear = new Date().getFullYear()
    const td = `${todayDate}/${todayMonth + 1}/${todayYear}`
    const d = new Date()
    const nd = new Date(d.getTime() + (24 * 60 * 60 * 1000))
    const tomDate = nd.getDate()
    const tomMonth = nd.getMonth()
    const tomYear = nd.getFullYear()
    const tod = `${tomDate}/${tomMonth + 1}/${tomYear}`
    const nnd = new Date(d.getTime() + (2 * 24 * 60 * 60 * 1000))
    const nnDate = nnd.getDate()
    const nnMonth = nnd.getMonth()
    const nnYear = nnd.getFullYear()
    const nndate = `${nnDate}/${nnMonth + 1}/${nnYear}`
    await Orders.find({ city: req.gc.city, status: "pending" }).then(orders => {
      const nnorder = orders.filter(ord => ord.pickupslot.split(' ')[0] !== td && ord.pickupslot.split(' ')[0] !== tod && ord.pickupslot.split(' ')[0] !== nndate)
      return res.status(200).send(nnorder)
    })
  } catch (e) {
    return res.status(400).send(e)
  }
}

exports.completedorders = async (req, res) => {
  try {
    await ConfirmedOrder.find({ city: req.gc.city }).then(orders => {
      return res.status(200).send(orders)
    })
  } catch (e) {
    return res.status(400).send(e)
  }
}

exports.getorderbyid = async (req, res) => {
  try {
    await Orders.findById(req.query.id).then(order => {
      return res.status(200).send(order)
    })
  } catch (e) {
    return res.status(400).send(e)
  }
}

exports.sendconfirmedorder = async (req, res) => {
  try {
    const confirmOrder = new ConfirmedOrder({
      orderId: req.body.orderId,
      city: req.body.city,
      garbage: req.body.garbage,
      totalWeight: req.body.totalWeight,
      totalAmount: req.body.totalAmount
    })
    await confirmOrder.save().then(async order => {
      await Orders.findById(order.orderId).then(async ord => {
        ord.status = "completed"
        await ord.save()
        await User.findById(ord.userId).then(async user => {
          user.walletAmount = parseFloat((user.walletAmount + req.body.totalAmount).toFixed(2))
          await user.save()
          await GarbageCollector.findById(req.gc._id).then(async gc => {
            gc.walletAmount = parseFloat((gc.walletAmount - req.body.totalAmount).toFixed(2))
            await gc.save()
            const gcTra = new gcTransaction({
              gcId: gc._id,
              withdraw: parseFloat(req.body.totalAmount),
              sender: gc.city,
              receiver: user.name
            })
            await gcTra.save()
            const userTra = new UserTransaction({
              userId: user._id,
              deposit: parseFloat(req.body.totalAmount),
              sender: gc.city,
              receiver: user.name
            })
            await userTra.save()
          }).catch((e) => {
            return res.status(400).send(e)
          })

        }).catch((e) => {
          return res.status(400).send(e)
        })
      }).catch((e) => {
        return res.status(400).send(e)
      })
    }).catch((e) => {
      return res.status(400).send(e)
    })
    return res.status(200).send("ok")
  } catch (e) {
    return res.status(400).send(e)
  }
}


exports.getgcdata = async (req, res) => {
  try {
    let totalSpend = 0
    let totalGarbageWeight = 0
    let totalCompletedorder = 0
    await ConfirmedOrder.find({ city: req.gc.city }).then(order => {

      totalCompletedorder = order.length
      for (let i = 0; i < order.length; i++) {
        totalSpend =totalSpend+ parseInt(order[i].totalAmount)
        totalGarbageWeight =totalGarbageWeight+ parseInt(order[i].totalWeight)
      }
      return res.status(200).send({totalSpend,totalGarbageWeight,totalCompletedorder})
    }).catch(e => {
      return res.status(400).send(e)
    })

  } catch (e) {
    return res.status(400).send(e)
  }
}

