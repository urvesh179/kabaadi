const express = require("express");
const router = express.Router();
const auth = require('./auth')

const { sendorder, getorders, cancelorder, updateorderaddress, getconfirmorder } = require("../controller/ordercontroller");

router.post("/sendorder", auth, sendorder)

router.get("/getorders", auth, getorders)

router.post("/cancelorder", auth, cancelorder)

router.post("/updateorderaddress", auth, updateorderaddress)

router.get('/getconfirmorder', auth, getconfirmorder)

module.exports = router
