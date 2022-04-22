//ROUTES
const authRoutes = require('./routes/auth-r')
const chatRoutes = require('./routes/chat-r')
const messageRoutes = require('./routes/message-r')
const profileRoutes = require('./routes/profile-r')
//

// LIBRARIES
const passport = require('passport')
const keys = require('./config/keys')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const mongoose = require('mongoose')
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

const cors = require('cors')
const morgan = require('morgan')
app.use(morgan('dev'))
app.use(cors())


app.use(passport.initialize())
require('./mid/passport')(passport)
//
//eto tut vremenno
/*const upload = require('./mid/upload')*/

//APP

app.get('/', (req, res)=>{
    res.status(200).json({message: 'working 666'})
})

app.use('/uploads', express.static('uploads'))
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/profile', profileRoutes)

//eto tut vremenno
/*app.post("/upload_files", upload.single('avatar'), uploadFiles);
function uploadFiles(req, res) {
    const path = req.file.path
    res.status(200).json({path})
}*/



module.exports = app