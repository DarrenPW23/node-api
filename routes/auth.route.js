//routes/auth.js
const express = require('express');
const router = express.Router();
const { sign } = require('../util/jwt');
const { isEmail } = require('lodash');

const { user, Sequelize } = require("./../models");
const Op = Sequelize.Op;

// route for register that checks if the user already exists by username, before registering
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !isEmail(email) ||!password) {
            return res.status(400).json({ message: 'Invalid content passed.' });
        }

        let u = await user.findOne({
            where: {
                [Op.or]: [{ username }, { email }],
            }
        });

        if (u) {
            return res.status(401).json({ message: 'Username already exists.' });
        }

        u = await user.create({ username, password, email });

        return res.json({ token: sign(u) });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        let u = await user.findOne({ where: { username } });
        u = u.toJSON();

        if (!u || u.password !== password) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect credentials.' });
        }

        return res.json({ token: sign(u) });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Authentication failed' });
    }
});

module.exports = router;