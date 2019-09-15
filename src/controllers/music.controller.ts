/**
 * controller - /musics
 *
 */

import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/http.exceptions';
import { asyncHandler } from '../middleware/error.middleware';
import * as utils from '../helpers/util.helper';
import { Music } from '../db/models/music.model';

const logger = utils.getLogger(__filename);

const getMusics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getMusics`);
    const musics = await Music.find();
    musics.length ? res.status(200).send(musics) : next(new HttpException(404, 'musics not found'));
  },
);

const getMusicDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`getMusicDetails for ${req.params.musicId}`);
    const musicDetails = await Music.findById(req.params.musicId);
    musicDetails ? res.status(200).send(musicDetails) : next(new HttpException(404, 'music not found'));
  },
);

const addMusic = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`addMusic`);
    const music = new Music(req.body);
    await music.save();
    res.status(201).send('Music created successfully');
  },
);

const updateMusic = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`updateMusic ${req.params.musicId}`);
    const music = await Music.findByIdAndUpdate(req.params.musicId, req.body, { new: true });
    res.status(200).send(music);
  },
);

const deleteMusic = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`deleteMusic ${req.params.musicId}`);

    await Music.findByIdAndDelete(req.params.musicId);
    res.status(200).send('Music deleted successfully');
  },
);

const addMusicToCatalog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(`addMusicToCatalog - music ${req.params.musicId} to catalog ${req.params.catId}`);
    const music = await Music.findByIdAndUpdate(req.params.musicId, { catalogId: req.params.catId }, { new: true });
    res.status(200).send(music);
  },
);

export { getMusics, getMusicDetails, addMusic, updateMusic, deleteMusic, addMusicToCatalog };
