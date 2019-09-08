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
import cors from 'cors'; // CORS
import helmet from 'helmet'; // Security
import swaggerUi from 'swagger-ui-express'; //swagger
import YAML from 'yamljs';

import * as utils from './helpers/util.helper';
import { LoggerStream } from './helpers/log.helper';

import * as authHandler from './middleware/auth.middleware'; // auth
import * as errorHandler from './middleware/error.middleware'; // error handler
import routes from './routes'; // routes

const app = express();

const logger = utils.getLogger(__filename);
const host = process.env.HOST || config.get('host');
const port = process.env.PORT || config.get('port');

const swaggerDocument = YAML.load(`${__dirname}/api/swagger.yaml`);

// middleware

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

// initialize 404 handler
app.use(errorHandler.fofHandler);

// initialize error handler
app.use(errorHandler.errorHandler);

const server = http.createServer(app).listen(port, async () => {
  logger.info(`SERVER STARTED at http://${host}:${port}`);
});

server.timeout = 240000;
