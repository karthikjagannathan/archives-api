/**
 * route - /
 *
 */

import express from 'express';
import health from './health.route';
import catalogs from './catalogs.route';

const router = express.Router();

// index routes
router.get('/', (req, res) => {
  res.send(`root: ${req.hostname} api`);
});

router.use('/health', health);
router.use('/catalogs', catalogs);

export default router;
