import fs from 'fs';
import path from 'path';
import https from 'https';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from 'routes';
import bodyParser from 'body-parser';

import dbInit from 'db/init';
import { requestLogger } from 'middleware';
import { ROUT_PATTERN, environment } from 'resources/constants'
import logger from 'logger';
import { ApiError } from 'resources/types';
import { StatusCodes } from 'http-status-codes';

const app: Application = express()

// Body parsing Middleware
app.use(cookieParser());
app.use(requestLogger);
app.use(bodyParser.json());

app.use(cors({
  origin: environment.CORSE_ORIGIN,
  credentials: true,
}));

const basePath: string = path.join(__dirname, '..');
const frontendPath: string = path.join(basePath, '..', environment.FRONTEND_PATH);

const privateKey: string = fs.readFileSync(`${basePath}/${environment.PRIVATE_KEY_PATH}`, 'utf8');
const certificate: string = fs.readFileSync(`${basePath}/${environment.CERTIFICATE_PATH}`, 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

app.use(express.static(frontendPath));
app.get(ROUT_PATTERN, (_, res) => res.sendFile(path.join(frontendPath, 'index.html')));

app.use('/api/', routes)

export const start = () => {
  try {
    dbInit().then(() => {
      httpsServer.listen(environment.PORT, () => {
        logger.info(`⚡️[server]: Server is running at ${environment.PORT} port`);
      })
    })
  } catch (error: any) {
    const err = new ApiError({
      message: error?.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      name: ""
    });
    logger.error(err);
  }
}

start();