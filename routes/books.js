var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}


/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll( );
  res.render("index", {books,  });
}));

 /* Create a new book form. */
 router.get('/new', (req, res) =>{
  res.render("books/new-book", {book: {},  });
 });

// /* POST create book. */
router.post('/', asyncHandler(async (req, res) => {
  console.log(req.body);
    
  let book;
  try {
    book = await Book.create(req.body);
    //res.redirect("/books/" + book.id);
    res.redirect("/books");
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("books/new-book", { book, errors: error.errors,  })
    } else {
      throw error;
    }  
  }
}));
// /* Edit book form. */
// /* GET individual book */

router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("books/update-book", { book, title: book.title });  
  } else {
    res.sendStatus(404);
  }
})); 

// /* POST update book. */

router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect("/books/"); 
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("books/update-book", { book, errors: error.errors, })
    } else {
      throw error;
    }
  }
}));

router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("books/update-book", {book});
  } else {
    res.sendStatus(404);
  }
}));

/* Delete individual book. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;