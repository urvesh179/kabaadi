const GarbageCollector = require('../models/gcmodel')
const wallet = require('../models/wallet')
const adminTransaction = require('../models/adminTransaction')
const gcTransaction = require('../models/gcTransaction')
const Orders = require('../models/ordermodel')
const Garbage = require('../models/Garbagemodel')
const CompletedOrders = require('../models/confirmedOrder')
const User = require('../models/usermodel')
const bcrypt = require("bcryptjs");

const { SendMailToGc } = require('../utils/SendMailToGc')

exports.registergc = (req, res) => {

    GarbageCollector.findOne({ city: req.body.city, email: req.body.email }).then(async (gc) => {
        if (gc) {
            return res.status(400).json({ message: "Invalid Data" });
        } else {
            const pass = await bcrypt.hash(req.body.password, 8)
            const newGC = new GarbageCollector({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                city: req.body.city,
                address: req.body.address,
                password: pass,
            });

            await newGC.save().then(async (gc) => {
                // const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECERET);
                await SendMailToGc(req.body.email, req.body.password)
                return res.status(201).json(gc)
            }).catch((error) => {
                return res.status(400).json(error)
            })
        }
    }).catch((error) => {
        return res.status(400).json(error)
    });
};

exports.getgc = async (req, res) => {
    await GarbageCollector.find({}).then((gc) => {
        return res.status(200).send(gc)
    }).catch((e) => {
        return res.status(400).send(e)
    })
}


exports.cancelgc = async (req, res) => {
    const gcid = req.body.id
    await GarbageCollector.findByIdAndDelete(gcid).then(resp => {
        return res.status(200).send("garbage collector canceled.")
    }).catch(e => {
        return res.status(400).send("garbage collector cancel failed.")
    })
}

exports.getwallet = async (req, res) => {
    await wallet.findOne({}).then((resp) => {
        const wa = resp.walletAmount
        return res.status(200).send({ wa })
    }).catch((e) => {
        return res.status(404).send(e)
    })
}

exports.sendmoney = async (req, res) => {
    try {
        const gc = await GarbageCollector.findById(req.body.id)
        if (!gc) {
            return res.status(404).send("garbage collector not found")
        }
        gc.walletAmount = gc.walletAmount + parseFloat(req.body.money)
        gc.save()
        await wallet.findOne({}).then((resp) => {
            resp.walletAmount = resp.walletAmount - parseFloat(req.body.money)
            resp.save()
        })
        const Transaction = new adminTransaction({
            withdraw: parseFloat(req.body.money),
            sender: 'admin',
            receiver: gc.city
        })
        const gcTra = new gcTransaction({
            gcId: req.body.id,
            deposit: parseFloat(req.body.money),
            sender: 'admin',
            receiver: gc.city
        })
        await gcTra.save()
        await Transaction.save()
        return res.status(200).send()

    } catch (e) {
        return res.status(400).send(e)
    }
}

exports.gettransaction = async (req, res) => {
    await adminTransaction.find({}).then((transaction) => {
        return res.status(200).send(transaction)
    }).catch((e) => {
        return res.status(400).send(e)
    })
}

exports.addadminwallet = async (req, res) => {
    try {
        await wallet.findOne({}).then((resp) => {
            resp.walletAmount = resp.walletAmount + parseFloat(req.body.amount)
            resp.save()
        })
        const Transaction = new adminTransaction({
            deposit: parseFloat(req.body.amount),
            sender: 'Bank',
            receiver: 'Admin'
        })
        await Transaction.save()
        return res.status(200).send()
    } catch (e) {
        return res.status(400).send(e)
    }
}

exports.getorders = async (req, res) => {
    try {
        if (req.body.city !== 'allcity') {
            await Orders.find({ city: req.body.city }).then(resp => {
                return res.status(200).send(resp)
            })
        } else {
            await Orders.find({}).then(resp => {
                return res.status(200).send(resp)
            })
        }

    } catch (e) {
        return res.status(400).send("get order failed")
    }
}

exports.creategarbage = async (req, res) => {
    try {
        await Garbage.findOne({ category: req.body.garbage.category }).then(async resp => {
            for (let i = 0; i < resp.subcatagory.name; i++) {
                if (req.body.garbage.subcatagory === resp.subcatagory[i].name) {
                    return res.status(400).send("garbage already exist")
                }
            }
            resp.subcatagory = resp.subcatagory.concat([{
                name: req.body.garbage.subcatagory,
                rate: parseInt(req.body.garbage.rate),
                quntityin: req.body.garbage.quntityin,
                defaultWeight: parseFloat(req.body.garbage.defaultWeight)
            }])

            await resp.save()

            return res.status(200).send("garbage created")
        })
    } catch (e) {
        return res.status(400).send(e)
    }
}

exports.editgarbage = async (req, res) => {
    try {
        await Garbage.findOne({ category: req.body.garbage.category }).then(async resp => {
            const subname = resp.subcatagory.find(sc => sc.name === req.body.garbage.subcatagory)
            subname.rate = req.body.garbage.rate
            await resp.save()
            return res.status(200).send("garbage rate updated")
        })
    } catch (e) {
        return res.status(400).send(e)
    }
}

exports.deletegarbage = async (req, res) => {
    try {
        await Garbage.findOne({ category: req.body.garbage.category }).then(async resp => {
            resp.subcatagory = resp.subcatagory.filter(sc => sc.name !== req.body.garbage.subcatagory)
            await resp.save()
            return res.status(200).send("garbage deleted")
        })
    } catch (e) {
        return res.status(400).send(e)
    }
}


exports.getdata = async (req, res) => {
    try {
        let totalSpend = 0
        let totalGarbageWeight = 0
        let totalOrder = 0
        let totalUser = 0
        await CompletedOrders.find({}).then(order => {
            for (let i = 0; i < order.length; i++) {
                totalSpend = totalSpend + parseInt(order[i].totalAmount)
                totalGarbageWeight = totalGarbageWeight + parseInt(order[i].totalWeight)
            }
        }).catch(e => {
            return res.status(400).send(e)
        })
        await Orders.find({}).then(order => {
            totalOrder = order.length
        }).catch(e => {
            return res.status(400).send(e)
        })
        await User.find({}).then(user => {
            totalUser = user.length
        }).catch(e => {
            return res.status(400).send(e)
        })
        return res.status(200).send({ totalSpend, totalGarbageWeight, totalOrder, totalUser })
    } catch (e) {
        return res.status(400).send(e)
    }
}

exports.getrecordbycity = async (req, res) => {
    try {
        let paperweight = 0, plasticweight = 0, metalweight = 0, ewasteweight = 0, otherweight = 0
        let paperspend = 0, plasticspend = 0, metalspend = 0, ewastespend = 0, otherspend = 0
        if (req.query.city === 'allcity') {
            await CompletedOrders.find({}).then(orders => {
                for (let k = 0; k < orders.length; k++) {
                    
                    const garbage = Object.values(orders[k].garbage)
                    
                    const paperobject = garbage[0]
                    paperweight += parseInt(paperobject[paperobject.length - 1].totalPaperWeight)
                    paperspend += parseInt(paperobject[paperobject.length - 1].totalPaperAmount)

                    const plasticobject = garbage[1]
                    plasticweight += parseInt(plasticobject[plasticobject.length - 1].totalPlasticWeight)
                    plasticspend += parseInt(plasticobject[plasticobject.length - 1].totalPlasticAmount)

                    const metalobject = garbage[2]
                    metalweight += parseInt(metalobject[metalobject.length - 1].totalMetalWeight)
                    metalspend += parseInt(metalobject[metalobject.length - 1].totalMetalAmount)

                    const ewasteobject = garbage[3]
                    ewasteweight += parseInt(ewasteobject[ewasteobject.length - 1].totaleWasteWeight)
                    ewastespend += parseInt(ewasteobject[ewasteobject.length - 1].totaleWasteAmount)

                    const otherobject = garbage[4]
                    otherweight += parseInt(otherobject[otherobject.length - 1].totalOtherWeight)
                    otherspend += parseInt(otherobject[otherobject.length - 1].totalOtherAmount)
                }
                
            }).catch(e=>{
                return res.status(400).send(e)
            })

        }else{
            const city=req.query.city.charAt(0).toUpperCase()+req.query.city.slice(1)
            await CompletedOrders.find({city}).then(orders => {
                for (let k = 0; k < orders.length; k++) {
                    
                    const garbage = Object.values(orders[k].garbage)
                    
                    const paperobject = garbage[0]
                    paperweight += parseInt(paperobject[paperobject.length - 1].totalPaperWeight)
                    paperspend += parseInt(paperobject[paperobject.length - 1].totalPaperAmount)

                    const plasticobject = garbage[1]
                    plasticweight += parseInt(plasticobject[plasticobject.length - 1].totalPlasticWeight)
                    plasticspend += parseInt(plasticobject[plasticobject.length - 1].totalPlasticAmount)

                    const metalobject = garbage[2]
                    metalweight += parseInt(metalobject[metalobject.length - 1].totalMetalWeight)
                    metalspend += parseInt(metalobject[metalobject.length - 1].totalMetalAmount)

                    const ewasteobject = garbage[3]
                    ewasteweight += parseInt(ewasteobject[ewasteobject.length - 1].totaleWasteWeight)
                    ewastespend += parseInt(ewasteobject[ewasteobject.length - 1].totaleWasteAmount)

                    const otherobject = garbage[4]
                    otherweight += parseInt(otherobject[otherobject.length - 1].totalOtherWeight)
                    otherspend += parseInt(otherobject[otherobject.length - 1].totalOtherAmount)
                }
                
            }).catch(e=>{
                return res.status(400).send(e)
            })
        }
        return res.status(200).send({ paper: { paperweight, paperspend }, plastic: { plasticweight, plasticspend }, metal: { metalweight, metalspend }, ewaste: { ewastespend, ewasteweight }, other: { otherweight, otherspend } })

    } catch (e) {
        return res.status(400).send(e)
    }
}