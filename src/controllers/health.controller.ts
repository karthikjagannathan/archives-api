/**
 * controller - /health
 *
 */

import { Request, Response } from 'express';

import * as utils from '../helpers/util.helper';
const logger = utils.getLogger(__filename);

const getHealth = (req: Request, res: Response): void => {
  logger.info('getHealth');
  res.status(200).send('Server is up!');
};

export { getHealth };
