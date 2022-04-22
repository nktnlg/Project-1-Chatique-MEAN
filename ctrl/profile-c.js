const errHandle = require('../tools/errHandle')
const User = require('../models/User-m')

module.exports.getById = async function(req, res) {
    try {
        const user = await User.find({_id: req.params.id})
        res.status(200).json(user)
    } catch(e) { errHandle(res, e) }
}
module.exports.patch = async function(req, res) {
    const updated = {
        username: req.body.username
    }
    if (req.file) {
        updated.avatarSrc = req.file.path
    }

    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(user)
    } catch(e) { errHandle(res, e) }
}