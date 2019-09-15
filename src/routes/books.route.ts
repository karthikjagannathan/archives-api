/**
 * route  /books
 * GET    /books                          Get list of books
 * POST   /books                          Add new book
 * GET    /books/:bookId                  Get single book
 * PUT    /books/:bookId                  Update book
 * DELETE /books/:bookId                  Delete book
 *
 * PUT    /books/:bookId/catalog/:catId   Add book to catalog
 * DELETE /books/:bookId/catalog/:bookId  Delete book from catalog
 */

import express from 'express';
const router = express.Router();

import * as booksCtrl from '../controllers/books.controller';

router.get('/', booksCtrl.getBooks);
router.get('/:bookId', booksCtrl.getBookDetails);
router.post('/', booksCtrl.addBook);
router.put('/:bookId', booksCtrl.updateBook);
router.delete('/:bookId', booksCtrl.deleteBook);

router.put('/:bookId/catalog/:catId', booksCtrl.addBookToCatalog);

export default router;
