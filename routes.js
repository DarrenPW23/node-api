const router = require('express').Router();
const AuthRoute = require('./routes/auth.route');
const UserRoute = require('./routes/user.route');

router.use('/auth', AuthRoute);
router.use('/user', UserRoute);

module.exports = router;