/**
 * route  /games
 * GET    /games                          Get list of games
 * POST   /games                          Add new game
 * GET    /games/:gameId                  Get single game
 * PUT    /games/:gameId                  Update game
 * DELETE /games/:gameId                  Delete game
 *
 * PUT    /games/:gameId/catalog/:catId   Add game to catalog
 * DELETE /games/:gameId/catalog/:gameId  Delete game from catalog
 */

import express from 'express';
const router = express.Router();

import * as gamesCtrl from '../controllers/games.controller';

router.get('/', gamesCtrl.getGames);
router.get('/:gameId', gamesCtrl.getGameDetails);
router.post('/', gamesCtrl.addGame);
router.put('/:gameId', gamesCtrl.updateGame);
router.delete('/:gameId', gamesCtrl.deleteGame);

router.put('/:gameId/catalog/:catId', gamesCtrl.addGameToCatalog);

export default router;
