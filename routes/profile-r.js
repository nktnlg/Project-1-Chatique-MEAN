const passport = require('passport')
const express = require('express')
const router = express.Router()
const controller = require('../ctrl/profile-c')
const upload = require('../mid/upload')


router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('avatar'), controller.patch)

module.exports = router
