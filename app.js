const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false, useNewUrlParser: true}));
// parse application/json
app.use(bodyParser.json());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

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

// add articles route
app.get('/articles/add', function (req, res) {
    res.render('add_articles', {
        title: "Add articles"
    })
});

// Add submit POST route
app.post('/articles/add', function (req, res) {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// View single article
app.get('/article/:id', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            console.log(err);
        } else {
            res.render('article', {
                article: article
            });
        }
    })
});

// edit article
app.get('/article/edit/:id', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            console.log(err)
        } else {
            res.render('edit_article', {
                title: "Edit Article",
                article: article
            })
        }
    })
});

// update post
app.post('/article/edit/:id', function (req, res) {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id: req.params.id};
    Article.update(query, article, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// delete article
app.delete('/article/:id', function (req, res) {
    let query = {_id: req.params.id};

    Article.remove(query, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.send('deleted success fully');
        }
    })
});

// start server
app.listen(3000, function () {
    console.log('server started on port 3000...');
});