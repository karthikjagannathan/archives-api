/**
 * route - /catalogs
 *
 */

import express from 'express';
const router = express.Router();

import * as catalogsCtrl from '../controllers/catalogs.controller';

router.get('/', catalogsCtrl.getCatalogs);

export default router;
