const express = require('express');
const path = require('path');
const session = require('express-session');

require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;
const SESSION_KEY = process.env.SESSION_KEY || 'your-secret-key';

const app = express();

app.use(session({ secret: SESSION_KEY, resave: false, saveUninitialized: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public'))); // public folder

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

app.on('error', (err) => {
    if (err.syscall !== 'listen') throw err

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errs with friendly messages
    switch (err.code) {
        case 'EACCES':
            console.err(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.err(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw err;
    }
});

module.exports = app;