/**
 * middleware - error
 *
 */

import { Request, Response } from 'express';
import HttpException from '../exceptions/http.exceptions';
import { NextFunction } from 'connect';

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

export { fofHandler, errorHandler };
