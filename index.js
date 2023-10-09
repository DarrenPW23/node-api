const app = require('./app');
const router = require('./routes');
const passport = require('./passport-config');

require('./mutations');

app.use(passport.initialize());

app.use(router);

// Example protected route
app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ message: 'Protected profile route', user: req.user });
});

app.all('/*', (req, res) => {
    return res.json({ message: "Welcome to my Node API." });
})