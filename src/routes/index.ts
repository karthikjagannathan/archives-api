/**
 * route - /
 *
 */

import express from 'express';
import health from './health.route';
import catalogs from './catalogs.route';
import books from './books.route';
import games from './games.route';
import movies from './movies.route';
import music from './music.route';

const router = express.Router();

// index routes
router.get('/', (req, res) => {
  res.send(`root: ${req.hostname} api`);
});

router.use('/health', health);
router.use('/catalogs', catalogs);
router.use('/books', books);
router.use('/games', games);
router.use('/movies', movies);
router.use('/music', music);

export default router;
