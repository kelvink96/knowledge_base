const express = require('express');
const router = express.Router();

// load article model
let User = require('../models/user');

// get register form
router.get('/register', function (req, res) {
    res.render('register');
});