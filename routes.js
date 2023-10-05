const router = require('express').Router();
const UserRoute = require('./routes/user.route');

router.use('/user', UserRoute);

module.exports = router;