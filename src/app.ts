/**
 * app.ts
 */

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'sandbox';
}

import morgan from 'morgan'; // log requests to the console (express4)
import express from 'express';
import http from 'http';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors'; // CORS
import helmet from 'helmet'; // Security
import swaggerUi from 'swagger-ui-express'; //swagger
import YAML from 'yamljs';
import mongoose from 'mongoose';

import * as utils from './helpers/util.helper';
import { LoggerStream } from './helpers/log.helper';

import * as authHandler from './middleware/auth.middleware'; // auth
import * as errorHandler from './middleware/error.middleware'; // error handler
import routes from './routes'; // routes
// import * as db from './db';

const app = express();
const host = process.env.HOST || config.get('host');
const port = process.env.PORT || config.get('port');
const swaggerDocument = YAML.load(`${__dirname}/api/swagger.yaml`);
const logger = utils.getLogger(__filename);

const startup = async (): Promise<void> => {
  // morgan error stream - process.stderr
  app.use(
    morgan(config.get('logging.morgan.logType'), {
      skip(req, res) {
        return res.statusCode < 400;
      },
      stream: process.stderr,
    }),
  );

  // morgan output stream - process.stdout
  app.use(
    morgan(config.get('logging.morgan.logType'), {
      skip(req, res) {
        return res.statusCode >= 400;
      },
      stream: new LoggerStream(),
    }),
  );

  app.use(
    bodyParser.json({
      limit: '50mb',
    }),
  );
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
    }),
  );

  // cors
  app.options('*', cors());
  app.use(cors());

  // helmet
  app.use(helmet());

  // routes
  app.use(authHandler.authenticate);
  app.use(routes);

  // Swagger API docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // db.initDb();
  await mongoose.connect(config.get('mongodb.connectionString'));
  logger.info('Database initialized...');

  // initialize 404 handler
  app.use(errorHandler.fofHandler);

  // initialize error handler
  app.use(errorHandler.errorHandler);

  const server = http.createServer(app).listen(port, async () => {
    logger.info(`SERVER STARTED at http://${host}:${port}`);
  });

  server.timeout = 240000;
};

// start
startup();

async function shutdown(e: Error): Promise<void> {
  let err = e;

  logger.info('Shutting down application...');

  try {
    logger.info('Terminating web server module...');

    // TODO shutdown server
  } catch (e1) {
    logger.info(e1);
    err = err || e1;
  }

  logger.info('Exiting process...');

  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM');
  shutdown(new Error('SIGTERM'));
});

process.on('SIGINT', () => {
  logger.info('Received SIGINT');
  shutdown(new Error('SIGINT'));
});

process.on('uncaughtException', err => {
  logger.info('Uncaught exception');
  logger.info(err);

  shutdown(err);
});
