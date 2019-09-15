/**
 * route  /movies
 * GET    /movies                          Get list of movies
 * POST   /movies                          Add new movie
 * GET    /movies/:movieId                  Get single movie
 * PUT    /movies/:movieId                  Update movie
 * DELETE /movies/:movieId                  Delete movie
 *
 * PUT    /movies/:movieId/catalog/:catId   Add movie to catalog
 * DELETE /movies/:movieId/catalog/:movieId  Delete movie from catalog
 */

import express from 'express';
const router = express.Router();

import * as moviesCtrl from '../controllers/movies.controller';

router.get('/', moviesCtrl.getMovies);
router.get('/:movieId', moviesCtrl.getMovieDetails);
router.post('/', moviesCtrl.addMovie);
router.put('/:movieId', moviesCtrl.updateMovie);
router.delete('/:movieId', moviesCtrl.deleteMovie);

router.put('/:movieId/catalog/:catId', moviesCtrl.addMovieToCatalog);

export default router;
