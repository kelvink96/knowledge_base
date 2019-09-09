const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/knowledgebase');
let db = mongoose.connection;

// Init app
const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function (req, res) {
    let articles = [
        {
            id: 1,
            title: 'Article One',
            author: 'Kelvin Kiptum',
            body: 'This is article one'
        }, {
            id: 2,
            title: 'Article Two',
            author: 'Kelvin Kiptum',
            body: 'This is article two'
        }, {
            id: 3,
            title: 'Article Three',
            author: 'Kelvin Kiptum',
            body: 'This is article three'
        }
    ];
    res.render('index', {
        title: "Articles",
        articles: articles
    });
});

// add articles route
app.get('/articles/add', function (req, res) {
    res.render('add_articles', {
        title: "Add articles"
    })
});

// start server
app.listen(3000, function () {
    console.log('server started on port 3000...');
});