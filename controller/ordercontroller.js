const Order = require('../models/ordermodel')
const ConfirmOrder = require('../models/confirmedOrder')

exports.sendorder = async (req, res) => {
    const order = new Order({
        userId: req.user._id,
        name: req.body.name,
        address: req.body.address,
        mobile: req.body.mobile,
        city: req.user.city,
        garbage: req.body.garbage,
        weight: req.body.weight,
        pickupslot: req.body.pickupslot,
        status: req.body.status
    })

    await order.save().then(order => {
        return res.status(201).send(order)
    })

}

exports.getorders = async (req, res) => {
    const userid = req.user._id
    await Order.find({ userId: userid }).then(orders => {
        return res.status(200).send(orders)
    }).catch((e) => {
        return res.status(400).send(e)
    })
}

exports.cancelorder = async (req, res) => {
    const orderid = req.body.id
    await Order.findByIdAndDelete(orderid)

    return res.status(200).send("order canceled")
}

exports.updateorderaddress = async (req, res) => {
    const orderid = req.body.id
    await Order.findById(orderid).then(async order => {
        order.address = req.body.address
        await order.save().then(resp => {
            return res.status(200).send("updated address")
        })
    })
}


exports.getconfirmorder = async (req, res) => {
    try {
        await ConfirmOrder.findOne({ orderId: req.query.id }).then(async order => {
            return res.status(200).send({ order, email: req.user.email })
        })
    } catch (e) {
        return res.status(400).send(e)
    }
}

