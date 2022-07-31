const mongoose = require("mongoose");

const garbageschema=new mongoose.Schema({
    category:{
        type:String,
        required:true,
        trim:true
    },
    subcatagory:[{
        name:String,
        rate:Number,
        quntityin:String,
        defaultWeight:Number
    }]
})

module.exports=mongoose.model("Garbage",garbageschema)