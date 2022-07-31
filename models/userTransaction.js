const mongoose = require('mongoose')

const userTransactionSchema = new mongoose.Schema({
    userId: {
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

module.exports = mongoose.model("UserTransaction", userTransactionSchema)