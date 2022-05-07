const express = require('express')
const router = express.Router()
const controller = require('../ctrl/auth-c')




router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/passwordCheck', controller.passCheck)


module.exports = router