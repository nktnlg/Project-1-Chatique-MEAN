const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    },
    lastMessage: {
        type: String,
        required: true
    },
    messageCount: {
        type: Number,
        default: 1
    }

})

module.exports = mongoose.model('chat', chatSchema)