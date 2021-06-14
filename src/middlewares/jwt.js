const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('../database/models/index');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                let user = await db.User.findByPk(jwt_payload.id);
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (error) {
                return done(error, false, {
                    message: 'Server Error'
                });
            }
        })
    );
};
