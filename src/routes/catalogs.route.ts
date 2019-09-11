/**
 * route - /catalogs
 *
 */

import express from 'express';
const router = express.Router();

import * as catalogsCtrl from '../controllers/catalogs.controller';

router.get('/', catalogsCtrl.getCatalogs);
router.get('/:catId', catalogsCtrl.getCatalogDetails);
router.get('/:catId/books', catalogsCtrl.getCatalogBooks);

export default router;