const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'; // Replace with your actual secret key

module.exports = {
    secret: jwtSecret,
    sign: (payload) => {
        return jwt.sign(payload, jwtSecret, { expiresIn: '1h' })
    },
    verify: (token) => {
        return jwt.verify(token, jwtSecret);
    }
}