'use strict';

let mongoose = require('mongoose');
let Book = require('../models/books');

/**
 * get all the books
 */
module.exports.getBooks = (req, res) => {
  let query = Book.find({});
  query.exec((err, books) => {
    if (err) {
      res.send(err);
    } else {
      res.json(books);
    }
  })
}

module.exports.getBook = (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      res.send(err)
    } else {
      res.json(book);
    }
  })
}

/**
 * save a new book
 */
module.exports.postBook = (req, res) => {
  let newBooks = new Book(req.body);
  newBooks.save((err, book) => {
    if (err) {
      res.send(err)
    } else {
      res.json({ message: "Book Successfully added!", book });
    }
  })
}

module.exports.deleteBook = (req, res) => {
  Book.remove({ _id: req.params.id }, (err, result) => {
    res.json({ message: "Book Successfully deleted!", result })
  })
}

module.exports.updateBook = (req, res) => {
  Book.findById({ _id: req.params.id }, (err, book) => {
    if (err) {
      res.send(err);
    } else {
      Object.assign(book, req.body).save((err, book) => {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Book Successfully updated!", book })
        }
      })
    }
  })
}
