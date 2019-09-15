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
import { Game } from '../db/models/game.model';
import { Movie } from '../db/models/movie.model';
import { Music } from '../db/models/music.model';

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

const getCatalogItems = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getCatalogItems of type ${req.query.type} for ${req.params.catId}`);

    const itemType = req.query.type;

    let items;

    if (itemType) {
      // filter

      if (itemType === 'book') {
        items = await Book.find({ catalogId: req.params.catId });
      } else {
        // TODO: add other types
      }
    } else {
      // TODO: get all items
      const books = await Book.find({ catalogId: req.params.catId });
      const games = await Game.find({ catalogId: req.params.catId });
      const movies = await Movie.find({ catalogId: req.params.catId });
      const music = await Music.find({ catalogId: req.params.catId });
      items = { books: [...books], games: [...games], movies: [...movies], music: [...music] };
    }

    items ? res.status(200).send(items) : next(new HttpException(404, 'items not found'));
  },
);

export { getCatalogs, getCatalogDetails, getCatalogItems };
