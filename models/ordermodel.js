const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 10,
        minlength: 10
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    garbage: {
        type: Array
    },
    weight:{
        type:String,
        required:true
    },
    pickupslot:{
        type:String,
        required:true
    },
    status: {
        type: String,
        default:"pending",
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)