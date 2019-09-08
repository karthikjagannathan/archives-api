/**
 * middleware - auth
 *
 */

import { NextFunction, Request, Response } from 'express';
import config from 'config';

import * as utils from '../helpers/util.helper';
const logger = utils.getLogger(__filename);

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  if (config.get('authenticate')) {
    logger.info('authentication');
    // TODO
  } else {
    // skip authentication
    logger.info('skip authentication');
    return next();
  }
};

export { authenticate };
