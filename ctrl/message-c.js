const errHandle = require('../tools/errHandle')
const Message = require('../models/Message-m')
const Chat = require('../models/Chat-m')
const User = require('../models/User-m')

module.exports.getAll = async function (req, res) {
    try {
        const messages = await Message.find().select('_id message chat date user').populate('user', 'username avatarSrc')
        const response = {
            count: messages.length,
            messages: messages.map(msg => {
                return {
                    _id: msg._id,
                    message: msg.message,
                    chat: msg.chat,
                    date: msg.date,
                    user: msg.user
                }
            })
        }
        res.status(200).json(response)
    } catch
        (e) {
        errHandle(res, e)
    }
}

module.exports.getByChat = async function (req, res) {
    try {
        const messages = await Message.find({chat: req.params.chatId}).select('_id message chat date user').populate('user', 'username avatarSrc')
        const response = messages
            .map(msg => {
                if (msg.user != null) {
                    return {
                        _id: msg._id,
                        message: msg.message,
                        chat: msg.chat,
                        date: msg.date,
                        user: msg.user
                    }
                } else {
                    return {
                        _id: msg._id,
                        message: msg.message,
                        chat: msg.chat,
                        date: msg.date,
                        user: {
                            username: 'DELETED',
                            avatarSrc: ''
                        }
                    }
                }
            })


        console.log(response)
        res.status(200).json(response)
    } catch (e) {
        errHandle(res, e)
    }
}

module.exports.new = async function (req, res) {
    //req needs message, chatId, userId
    const candidate = await Chat.findById(req.params.chatId).catch(error => {
        console.error(error)
    })
    if (candidate) {
        try {
            const message = await new Message({
                message: req.body.message,
                chat: req.params.chatId,
                user: req.user.id
            }).save()
            res.status(201).json(message)
        } catch (e) {
            errHandle(res, e)
        }
    } else {
        res.status(404).json('chat not existing')

    }

}

module.exports.delete = async function (req, res) {
    const candidate = await Message.findById(req.params.id)
    if (candidate) {
        try {
            await Message.deleteOne({_id: req.params.id})
                .then(res.status(200).json({message: 'item deleted'}))
        } catch (e) {
            errHandle(res, e)
        }
    } else {
        res.status(409).json({
            message: 'Message doesnt exist'
        })
    }


}
