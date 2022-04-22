const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    message:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    chat: {
        ref: 'chat',
        type: Schema.Types.ObjectId,
        required: true
    },
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('message', messageSchema)