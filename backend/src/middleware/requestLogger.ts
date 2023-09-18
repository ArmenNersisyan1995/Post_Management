import { NextFunction, Request, Response } from 'express';

import logger from 'logger';

const requestLogger = (request: Request, _: Response, next: NextFunction) => {
  const ip = request.ip || '';
  logger.info(`INCOMING: [${ip}], METHOD: ${request.method}, PATH: ${request.path}`);
  return next();
};

export default requestLogger;
