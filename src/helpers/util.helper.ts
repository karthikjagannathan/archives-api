/**
 * helper - utils
 *
 */

import * as log from './log.helper';
import winston from 'winston';

const getLogger = (moduleName: string): winston.Logger => {
  const logger = log.logger(moduleName);
  return logger;
};

export { getLogger };
