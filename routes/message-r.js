const passport = require('passport')
const express = require('express')
const router = express.Router()
const controller = require('../ctrl/message-c')

router.get('/:chatId', passport.authenticate('jwt', {session: false}), controller.getByChat)
router.post('/:chatId', passport.authenticate('jwt', {session: false}), controller.new)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router