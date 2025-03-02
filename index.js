const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');

mongoose.connect('mongodb+srv://arun:1234@cluster0.xs8jb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

global.loggedIn = null;

const indexController = require('./controllers/indexController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const storeUserController = require('./controllers/storeUserController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController');
const homeController = require('./controllers/homeController');

const redirectIfAuth = require('./middleware/redirectIfAuth');
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressSession({
    secret: 'node secret'
}));
app.use(flash());
app.use(express.urlencoded());
app.use(express.json());
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

app.get('/',indexController);
app.get('/home',authMiddleware,homeController);
app.get('/login', redirectIfAuth ,loginController);
app.get('/register',redirectIfAuth ,registerController);
app.post('/users/register',redirectIfAuth ,storeUserController);
app.post('/users/login',redirectIfAuth ,loginUserController);
app.get('/logout',logoutController);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
