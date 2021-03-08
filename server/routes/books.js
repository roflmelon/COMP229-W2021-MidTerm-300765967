// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
//added link to book details
  res.render('books/details', {title: 'Add Book'});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = book({
    "Title": req.body.Title,
    "Author": req.body.Author,
    "Price": req.body.Price,
    "Genre": req.body.Genre,
});

book.create(newBook,(err, books) => {
    if(err){
        console.log(err);
        res.end(err);
    }
    else
    {
        //refresh book list
        res.redirect('/books');
    }
})

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;

  Book.findById(id, (err, bookEdit) => {
      if(err){
          console.log(err);
          res.end(err);
      }
      else
      {
          // show the edit view
          res.render('books/edit', {
              title: 'Edit Book Details', book: bookEdit
          })
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;

  let updateBook = book({
      "_id": id,
      "Title": req.body.Title,
      "Author": req.body.Author,
      "Price": req.body.Price,
      "Genre": req.body.Genre,     
  });

  book.updateOne({_id: id}, updateBook, (err) => {
      if(err){
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          res.redirect('/books');
      }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
