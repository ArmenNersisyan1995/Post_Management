import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from 'logger';

import { ApiError } from 'resources/types';

export const getCurrentDate = (): string => {
  const logDate = new Date();
  const day = String(logDate.getDate());
  const year = String(logDate.getFullYear());
  const month = String((logDate.getMonth() + 1));
  return [
    (day.length < 2 ? `0${day}` : day),
    (month.length < 2 ? `0${month}` : month),
    year,
  ].join('-');
};

export const errorHandler = (
  err: TypeError | ApiError,
  _: Request,
  response: Response,
  __?: NextFunction // eslint-disable-line
) => {
  const customError = err instanceof ApiError
    ? err
    : new ApiError({
      message: 'Internal server error',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      name: 'internal',
    });

  logger.error(customError);
  response
    .status((customError as ApiError).statusCode)
    .send(customError);
};
