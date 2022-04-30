const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

const errHandle = require('../tools/errHandle')
const bcrypt = require('bcryptjs')
const User = require('../models/User-m')

module.exports.login = async function (req, res) {
    // в req.body нужны свойства username и password (интерфейс User)
    const candidate = await User.findOne({username: req.body.username})
    if (candidate) {
        //check password, user exists
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //generate token, password OK
            const token = jwt.sign({
                username: candidate.username,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 120})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            //wrong password
            res.status(401).json({
                message: 'Wrong password, try again'
            })
        }

    } else {
        //no such user, error
        res.status(404).json({
            message: 'User not found'
        })
    }
}

module.exports.register = async function (req, res) {
    // в req.body нужны свойства username и password (интерфейс User) + admCode
    const candidate = await User.findOne({username: req.body.username})

    if (req.body.admissionCode == keys.admissionCode) {
        //admission code OK
        if (candidate) {
            //user exists, must return error
            res.status(409).json({
                message: 'User with this name already exists',
                userExists: true
            })
        } else {
            //create user
            const salt = bcrypt.genSaltSync(10)
            const password = req.body.password
            const user = new User({
                username: req.body.username,
                password: bcrypt.hashSync(password, salt)
            })
            try {
                await user.save()
                res.status(201).json(user)
            } catch (e) {
                errHandle(res, e)
            }

        }
    } else {
        //wrong admission code, must return error
        res.status(409).json({
            message: 'Wrong admission code',
            wrongAdmissionCode: true
        })
    }
}