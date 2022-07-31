const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    walletAmount: {
        type:Number,
        default: 300000
    }
})

module.exports = mongoose.model("AdminWallet", walletSchema);

