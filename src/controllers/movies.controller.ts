/**
 * controller - /movies
 *
 */

import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/http.exceptions';
import { asyncHandler } from '../middleware/error.middleware';
import * as utils from '../helpers/util.helper';
import { Movie } from '../db/models/movie.model';

const logger = utils.getLogger(__filename);

const getMovies = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getMovies`);
    const movies = await Movie.find();
    movies.length ? res.status(200).send(movies) : next(new HttpException(404, 'movies not found'));
  },
);

const getMovieDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getMovieDetails for ${req.params.movieId}`);
    const movieDetails = await Movie.findById(req.params.movieId);
    movieDetails ? res.status(200).send(movieDetails) : next(new HttpException(404, 'movie not found'));
  },
);

const addMovie = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`addMovie`);
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send('Movie created successfully');
  },
);

const updateMovie = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`updateMovie ${req.params.movieId}`);
    const movie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true });
    res.status(200).send(movie);
  },
);

const deleteMovie = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`deleteMovie ${req.params.movieId}`);

    await Movie.findByIdAndDelete(req.params.movieId);
    res.status(200).send('Movie deleted successfully');
  },
);

const addMovieToCatalog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`addMovieToCatalog - movie ${req.params.movieId} to catalog ${req.params.catId}`);
    const movie = await Movie.findByIdAndUpdate(req.params.movieId, { catalogId: req.params.catId }, { new: true });
    res.status(200).send(movie);
  },
);

export { getMovies, getMovieDetails, addMovie, updateMovie, deleteMovie, addMovieToCatalog };
