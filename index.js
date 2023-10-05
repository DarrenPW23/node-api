const app = require('./app');
const router = require('./routes');
require('./mutations');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(
    async (username, password, done) => {
        /* add your custom implementation here that uses your DB */
        const user = {
            username,
            password
        }

        return done(null, user, { message: 'User logged in.' });
    }
));

app.use(router);

passport.serializeUser((user, done) => {
    /* You can add your own custom code here */
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    /* You can add your own custom code here */
    done(null, id);
});

app.all('/*', (req, res) => {
    return res.json({ message: "Welcome to my Node API." });
})