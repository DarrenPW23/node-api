const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const { secret } = require('./util/jwt'); // Replace with your actual secret key
const { user } = require('./models'); // Replace with your user model

passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
    }, async (obj, done) => {
        try {
            obj = await user.findByPk(obj.id);

            return done(null, obj || false);
        } catch (error) {
            return done(error, false);
        }
    })
);

module.exports = passport;
