'use strict';
let router = require('express').Router();
let books = require('../controllers/books');

router.get('/', books.getBooks);
router.post('/', books.postBook);
router.get('/:id', books.getBook);
router.put('/:id', books.updateBook);
router.delete('/:id', books.deleteBook);
module.exports = router;
