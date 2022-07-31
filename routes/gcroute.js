const express = require('express')
const router = express.Router()

const gcauth = require('./gcauth')
const { gclogin, getGCById, logout,todaypickup, tommorowpickup, previouspendingorder,completedorders,gctransaction,getorderbyid,sendconfirmedorder,getgcdata } = require('../controller/gccontroller')

router.post('/gclogin', gclogin)

router.get('/getgc', gcauth, getGCById)

router.get('/todaypickup',gcauth,todaypickup)

router.get('/tommorowpickup',gcauth,tommorowpickup)

router.get('/previouspendingorder',gcauth,previouspendingorder)

router.get('/completedorders',gcauth,completedorders)

router.get('/gctransaction', gcauth, gctransaction)

router.get('/getorderbyid',gcauth,getorderbyid)

router.post('/sendconfirmedorder',gcauth,sendconfirmedorder)

router.get('/logout', gcauth, logout)

router.get('/getgcdata',gcauth,getgcdata)

module.exports = router