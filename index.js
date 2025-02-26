const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
