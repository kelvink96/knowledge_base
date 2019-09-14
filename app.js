const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect('mongodb://localhost/knowledgebase');
let db = mongoose.connection;

// check connection
db.once('open', function () {
    console.log("connected to mongodb")
});

//check for db errors
db.on('error', function (err) {
    console.log(err);
});

// Init app
const app = express();

// bring in model
let Article = require('./models/articles');

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

// express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Home route
app.get('/', function (req, res) {
    Article.find({}, function (err, articles) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: "Articles",
                articles: articles
            });
        }
    })
});

// route files
let articles = require('./routes/articles');
app.use('/articles', articles);

// start server
app.listen(3000, function () {
    console.log('server started on port 3000...');
});