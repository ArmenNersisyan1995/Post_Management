import { Request, Response } from 'express';
import Joi, { ValidationResult } from 'joi';
import { StatusCodes } from 'http-status-codes';
import { ApiError, APIError } from 'resources/types';
import { errorHandler } from 'utils';
import { validateObject } from './helper';

const getQuerySchemaSignUp = Joi.object().keys({
  email: Joi.string().required().email({ tlds: { allow: false } }),
  password: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
});

const getQuerySchemaSignIn = Joi.object().keys({
  email: Joi.string().required().email({ tlds: { allow: false } }),
  password: Joi.string().required(),
});

export const validateSignUpQuery = (request: Request, response: Response, next: () => void) => {
  const { body = {} } = request;
  const validationResult: ValidationResult = validateObject(getQuerySchemaSignUp, body);
  if (validationResult.error) {
    const error: APIError = new ApiError({
      message: validationResult.error.message,
      statusCode: StatusCodes.BAD_REQUEST,
      name: validationResult.error.name,
    });
    return errorHandler(error, request, response);
  }
  return next();
};

export const validateSignInQuery = (request: Request, response: Response, next: () => void) => {
  const { body = {} } = request;
  const validationResult: ValidationResult = validateObject(getQuerySchemaSignIn, body);
  if (validationResult.error) {
    const error: APIError = new ApiError({
      message: validationResult.error.message,
      statusCode: StatusCodes.BAD_REQUEST,
      name: validationResult.error.name,
    });
    return errorHandler(error, request, response);
  }
  return next();
};
