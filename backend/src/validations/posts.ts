import { Request, Response } from 'express';
import Joi, { ValidationResult } from 'joi';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from 'resources/types';
import { errorHandler } from 'utils';
import { validateObject } from './helper';

const getQuerySchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const validateCreatePostQuery = (request: Request, response: Response, next: () => void) => {
  const { body = {} } = request;
  const validationResult: ValidationResult = validateObject(getQuerySchema, body);
  const validationError = validationResult?.error || null;
  if (validationError) {
    const error = new ApiError({
      message: validationError.message,
      name: validationError.name,
      statusCode: StatusCodes.BAD_REQUEST,
    });
    return errorHandler(error, request, response);
  }
  return next();
};

export default validateCreatePostQuery;
