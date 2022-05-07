const errHandle = require('../tools/errHandle')
const User = require('../models/User-m')

module.exports.getById = async function(req, res) {
    try {
        const user = await User.find({_id: req.params.id})
        res.status(200).json(user)
    } catch(e) { errHandle(res, e) }
}
module.exports.getAll = async function(req, res) {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(e) { errHandle(res, e) }
}


module.exports.patch = async function(req, res) {
    const updated = {
        username: req.body.username
    }
    if (req.file) {
        updated.avatarSrc = req.file.path
    }
    const candidate = await User.findOne({username: req.body.username})
    if (candidate) {
        //user exists, must return error
        res.status(409).json({
            message: 'User with this name already exists',
            userExists: true
        })
    } else {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.id},
                {$set: updated},
                {new: true}
            )
            res.status(200).json(user)
        } catch(e) { errHandle(res, e) }
    }




}


module.exports.delete = async function (req, res) {
    const candidate = await User.findOne({_id: req.params.id}).catch((error)=>{console.error(error)})
    console.log(`api delete, id is ${candidate}`)
    if (candidate) {
        try {
            await User.deleteOne({_id: req.params.id})
                .then(res.status(200).json({message: 'user deleted'}))
        } catch (e) {
            errHandle(res, e)
        }
    } else {
        res.status(409).json({
            message: 'User doesnt exist'
        })
    }

}