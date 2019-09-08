/**
 * route - /health
 *
 */

import express from 'express';
const router = express.Router();

import * as healthCtrl from '../controllers/health.controller';

router.get('/', healthCtrl.getHealth);

export default router;
