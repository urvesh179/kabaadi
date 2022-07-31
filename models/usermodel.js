const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
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
    },
    password: {
        type: String,
        required: true,
    },
    walletAmount:{
        type:Number,
        default:0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);