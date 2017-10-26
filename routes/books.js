module.exports = function(app) {
 
  var Book = require('../models/book.js');
 
  //GET - Return all books in the DB
  findAllTbooks = function(req, res) {
    console.log("GET - /books");
  	return Book.find(function(err, books) {
  		if(!err) {
  			return res.send(books);
  		} else {
        res.statusCode = 500;
  			console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
  		}
  	});
  };

  //POST - Insert a new Book in the DB
  addBook = function(req, res) {
    console.log('POST - /book');
    console.log(req.body);
 
    var book = new Book({
      title:    req.body.title,
      author: 	req.body.author, 
      price:    req.body.price      
    });
 
    book.save(function(err) {
      if(!err) {
        console.log("Book created");
        return res.send({ status: 'OK', book:book });
      } else {
        console.log(err);
        if(err.title == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });
 
    res.send(book);
  };

  //Link routes and functions
  app.get('/books', findAllTbooks);
  app.post('/book', addBook);
}



