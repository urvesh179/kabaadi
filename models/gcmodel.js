const mongoose = require('mongoose')

const gcSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 12
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 10
    },
    city: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    walletAmount: {
        type: Number,
        default: 10000
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('GarbageCollector', gcSchema)