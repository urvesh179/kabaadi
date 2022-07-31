const mongoose = require('mongoose')

const ConfirmedOrderSchema = new mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    garbage:{
        type:Object,
        required:true
    },
    totalWeight:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('ConfirmedOrder', ConfirmedOrderSchema)