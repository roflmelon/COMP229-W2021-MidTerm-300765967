// COMP229-F2020-MIDTERM-300765967
// Harry Zhou

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'My Favourite Books',
    books: ''
   });
});

module.exports = router;
