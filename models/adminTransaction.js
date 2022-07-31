const mongoose = require('mongoose')

const adminTransactionSchema = new mongoose.Schema({
    deposit: {
        type: Number
    },
    withdraw: {
        type: Number
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("adminTransaction", adminTransactionSchema)