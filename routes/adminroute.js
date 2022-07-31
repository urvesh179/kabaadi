const express = require('express')
const router = express.Router()

const { registergc, getgc, cancelgc, getwallet, sendmoney, gettransaction, addadminwallet, getorders, creategarbage, editgarbage, deletegarbage,getdata,getrecordbycity } = require('../controller/admincontroller')
// const { createwallet } = require('../controller/createAdminWallet')

router.post('/registergc', registergc)

router.get('/getgc', getgc)

router.post('/cancelgc', cancelgc)

// router.post('/adminwallet', createwallet)

router.get('/getadminwallet', getwallet)

router.post('/sendmoney', sendmoney)

router.get('/gettransaction', gettransaction)

router.post('/addadminwallet', addadminwallet)

router.post('/getorders', getorders)

router.post('/creategarbage', creategarbage)

router.post('/editgarbage', editgarbage)

router.post('/deletegarbage', deletegarbage)

router.get('/getdata',getdata)

router.get('/getrecordbycity',getrecordbycity)

module.exports = router