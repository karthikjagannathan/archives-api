/**
 * controller - /catalogs
 *
 */

import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/http.exceptions';
import { asyncHandler } from '../middleware/error.middleware';
// import { getDb } from '../db';
import * as utils from '../helpers/util.helper';
import { Catalog } from '../db/models/catalog.model';
import { Book } from '../db/models/book.model';

const logger = utils.getLogger(__filename);

const getCatalogs = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info('getCatalogs');
    const catalogs = await Catalog.find();
    catalogs.length ? res.status(200).send(catalogs) : next(new HttpException(404, 'catalogs not found'));
  },
);

const getCatalogDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getCatalogDetails for ${req.params.catId}`);
    const catId = req.params.catId;
    const catalogDetails = await Catalog.findById(catId);
    catalogDetails ? res.status(200).send(catalogDetails) : next(new HttpException(404, 'catalog not found'));
  },
);

const getCatalogBooks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getCatalogBooks for ${req.params.catId}`);
    const books = await Book.find({ catalogId: req.params.catId });
    books.length ? res.status(200).send(books) : next(new HttpException(404, 'books not found'));
  },
);

export { getCatalogs, getCatalogDetails, getCatalogBooks };
