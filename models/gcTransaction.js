const mongoose = require('mongoose')

const gcTransactionSchema = new mongoose.Schema({
    gcId: {
        type: String,
    },
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

module.exports = mongoose.model("gcTransaction", gcTransactionSchema)