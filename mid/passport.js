const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('user')
const keys = require('../config/keys')

const options = {
    //in req Headers looks for Authorization, its value shall be 'Bearer ${token}'
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(
            options,
            async (payload, done)=>{
                try
                {
                    const user = await User.findById(payload.userId).select('username id')

                    if (user) {
                        done(null, user)
                    } else {
                        done(null, false)
                    }
                }
                catch(e) {
                    console.log(e)
                }
            }
        )
    )
}