/**
 * middleware - error
 *
 */

import { Request, Response } from 'express';
import HttpException from '../exceptions/http.exceptions';
import { NextFunction } from 'connect';
import * as utils from '../helpers/util.helper';

const logger = utils.getLogger(__filename);

const fofHandler = (_request: Request, response: Response): void => {
  const status = 404;
  const message = 'Requested resource could not be found';
  response.status(status).send({
    status,
    message,
  });
};

const errorHandler = (error: HttpException, _request: Request, response: Response, next: NextFunction): void => {
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  response.status(status).send({
    status,
    message,
  });
  next();
};

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction): void => {
  Promise.resolve(fn(req, res, next)).catch(e => {
    logger.debug(e);
    // next(new HttpException(400, 'missing or invalid parameters'));
    next(new HttpException(400, e.message));
  });
};

export { fofHandler, errorHandler, asyncHandler };
