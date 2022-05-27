//ROUTES
const authRoutes = require('./routes/auth-r')
const chatRoutes = require('./routes/chat-r')
const messageRoutes = require('./routes/message-r')
const profileRoutes = require('./routes/profile-r')
//

// LIBRARIES
const path = require('path');
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


//APP


app.use('/uploads', express.static('uploads'))
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/profile', profileRoutes)

// Использовать билд на проде
if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/dist/client'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })
}


module.exports = app