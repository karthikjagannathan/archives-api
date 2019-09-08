/**
 * File and console logging using Morgan and Winston
 *
 */

import winston, { format, createLogger, transports } from 'winston';
import path from 'path';
import config from 'config';

const logger = (fileName: string): winston.Logger =>
  createLogger({
    format: format.combine(
      format.label({ label: path.basename(fileName) }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.json(),
      format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`),
    ),
    transports: [new transports.Console(config.get('logging.winston.console'))],
    exitOnError: false, // do not exit on handled exceptions
  });

// create a stream object with a 'write' function that will be used by `morgan`
class LoggerStream {
  write(message: string): void {
    logger('stdout').info(message); // use the 'info' log level so the output will be picked up by both transports (file and console)
  }
}

export { logger, LoggerStream };
