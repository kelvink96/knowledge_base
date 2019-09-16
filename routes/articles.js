const express = require('express');
const router = express.Router();

// load article model
let Article = require('../models/article');

// add articles router
router.get('/add', function (req, res) {
    res.render('add_articles', {
        title: "Add articles"
    })
});

// Add submit POST router
router.post('/add', function (req, res) {
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
router.get('/:id', function (req, res) {
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
router.get('/edit/:id', function (req, res) {
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
router.post('/article/edit/:id', function (req, res) {
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
router.delete('/:id', function (req, res) {
    let query = {_id: req.params.id};

    Article.remove(query, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.send('deleted success fully');
        }
    })
});

module.exports = router;