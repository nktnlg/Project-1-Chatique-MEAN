const passport = require('passport')
const express = require('express')
const router = express.Router()
const controller = require('../ctrl/chat-c')


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/', passport.authenticate('jwt', {session: false}), controller.new)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.patch)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router