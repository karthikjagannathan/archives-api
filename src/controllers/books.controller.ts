/**
 * controller - /books
 *
 */

import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/http.exceptions';
import { asyncHandler } from '../middleware/error.middleware';
import * as utils from '../helpers/util.helper';
import { Book } from '../db/models/book.model';

const logger = utils.getLogger(__filename);

const getBooks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getBooks`);
    const books = await Book.find();
    books.length ? res.status(200).send(books) : next(new HttpException(404, 'books not found'));
  },
);

const getBookDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getBookDetails for ${req.params.bookId}`);
    const bookDetails = await Book.findById(req.params.bookId);
    bookDetails ? res.status(200).send(bookDetails) : next(new HttpException(404, 'book not found'));
  },
);

const addBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`addBook`);
    const book = new Book(req.body);
    await book.save();
    res.status(201).send('Book created successfully');
  },
);

const updateBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`updateBook ${req.params.bookId}`);
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    res.status(200).send(book);
  },
);

const deleteBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`deleteBook ${req.params.bookId}`);

    await Book.findByIdAndDelete(req.params.bookId);
    res.status(200).send('Book deleted successfully');
  },
);

// TODO - pull out and make generic for all items
const addBookToCatalog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`addBookToCatalog - book ${req.params.bookId} to catalog ${req.params.catId}`);
    const book = await Book.findByIdAndUpdate(req.params.bookId, { catalogId: req.params.catId }, { new: true });
    res.status(200).send(book);
  },
);

export { getBooks, getBookDetails, addBook, updateBook, deleteBook, addBookToCatalog };
