/**
 * route  /music
 * GET    /music                          Get list of music albums
 * POST   /music                          Add new music album
 * GET    /music/:musicId                  Get single music album
 * PUT    /music/:musicId                  Update music album
 * DELETE /music/:musicId                  Delete music album
 *
 * PUT    /music/:musicId/catalog/:catId   Add music album to catalog
 * DELETE /music/:musicId/catalog/:musicId  Delete music album from catalog
 */

import express from 'express';
const router = express.Router();

import * as musicCtrl from '../controllers/music.controller';

router.get('/', musicCtrl.getMusics);
router.get('/:musicId', musicCtrl.getMusicDetails);
router.post('/', musicCtrl.addMusic);
router.put('/:musicId', musicCtrl.updateMusic);
router.delete('/:musicId', musicCtrl.deleteMusic);

router.put('/:musicId/catalog/:catId', musicCtrl.addMusicToCatalog);

export default router;
