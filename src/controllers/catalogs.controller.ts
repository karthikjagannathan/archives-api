/**
 * controller - /catalogs
 *
 */

import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/http.exceptions';
// import { getDb } from '../db';
import * as utils from '../helpers/util.helper';
import { Catalog } from '../db/models/catalog.model';
import { Book } from '../db/models/book.model';

const logger = utils.getLogger(__filename);

const getCatalogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  logger.info('getCatalogs');

  try {
    res.status(200).send(await Catalog.find());
  } catch (e) {
    logger.debug(e);
    next(new HttpException(400, 'missing or invalid parameters'));
  }
};

const getCatalogDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  logger.info(`getCatalogDetails for ${req.params.catId}`);

  const catId = req.params.catId;

  try {
    res.status(200).send(await Catalog.findById(catId));
  } catch (e) {
    logger.debug(e);
    next(new HttpException(400, 'missing or invalid parameters'));
  }
};

const getCatalogBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  logger.info(`getCatalogBooks for ${req.params.catId}`);

  try {
    const books = await Book.find({ catalogId: req.params.catId });

    if (books.length) {
      res.status(200).send(books);
    } else {
      next(new HttpException(404, 'books not found'));
    }
  } catch (e) {
    logger.debug(e);
    next(new HttpException(400, 'missing or invalid parameters'));
  }
};

export { getCatalogs, getCatalogDetails, getCatalogBooks };
