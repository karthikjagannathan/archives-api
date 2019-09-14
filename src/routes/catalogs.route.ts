/**
 * route - /catalogs
 *
 * GET    /catalogs           Get list of catalogs
 * POST   /catalogs           Add new catalog
 * GET    /catalogs/:catId    Get single catalog
 * PUT    /catalogs/:catId    Update catalog
 * DELETE /catalogs/:catId    Delete catalog
 *
 * GET /catalogs/:catId/items                 Get list of items in catalog
 * GET /catalogs/:catId/items?type=book       Get list of books in catalog
 * GET /catalogs/:catId/items?type=movie      Get list of movies in catalog
 * GET /catalogs/:catId/items?type=game       Get list of games in catalog
 * GET /catalogs/:catId/items?type=music      Get list of music in catalog
 *
 */

import express from 'express';
const router = express.Router();

import * as catalogsCtrl from '../controllers/catalogs.controller';

router.get('/', catalogsCtrl.getCatalogs);
router.get('/:catId', catalogsCtrl.getCatalogDetails);
router.get('/:catId/items', catalogsCtrl.getCatalogItems);

export default router;
