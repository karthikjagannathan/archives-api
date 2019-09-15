/**
 * controller - /games
 *
 */

import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/http.exceptions';
import { asyncHandler } from '../middleware/error.middleware';
import * as utils from '../helpers/util.helper';
import { Game } from '../db/models/game.model';

const logger = utils.getLogger(__filename);

const getGames = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getGames`);
    const games = await Game.find();
    games.length ? res.status(200).send(games) : next(new HttpException(404, 'games not found'));
  },
);

const getGameDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getGameDetails for ${req.params.gameId}`);
    const gameDetails = await Game.findById(req.params.gameId);
    gameDetails ? res.status(200).send(gameDetails) : next(new HttpException(404, 'game not found'));
  },
);

const addGame = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`addGame`);
    const game = new Game(req.body);
    await game.save();
    res.status(201).send('Game created successfully');
  },
);

const updateGame = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`updateGame ${req.params.gameId}`);
    const game = await Game.findByIdAndUpdate(req.params.gameId, req.body, { new: true });
    res.status(200).send(game);
  },
);

const deleteGame = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`deleteGame ${req.params.gameId}`);

    await Game.findByIdAndDelete(req.params.gameId);
    res.status(200).send('Game deleted successfully');
  },
);

const addGameToCatalog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`addGameToCatalog - game ${req.params.gameId} to catalog ${req.params.catId}`);
    const game = await Game.findByIdAndUpdate(req.params.gameId, { catalogId: req.params.catId }, { new: true });
    res.status(200).send(game);
  },
);

export { getGames, getGameDetails, addGame, updateGame, deleteGame, addGameToCatalog };
