import { request, Request, response, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import environment from "resources/constants/environment";

import { ApiError } from "resources/types";
import { RegistrationBodyParams } from "resources/types/user";
import { generateTokens, refreshService } from "service/token";
import service from 'service';
import { errorHandler } from "utils";
import jwt from 'jsonwebtoken';

export const signIn = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  try {
    const userInfo = await service.signIn(email, password) as JwtPayload;
    const tokens = generateTokens({ ...userInfo });
    response.cookie(
      'accessToken', tokens.accessToken,
      { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 10, secure: true}
    );
    response.cookie(
      'refreshToken', tokens.refreshToken,
      { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 10, secure: true}
    );
    response.status(StatusCodes.OK).send({
      id: userInfo.id,
      name: userInfo.name,
      surname: userInfo.surname,
      email: userInfo.email,
    });
  } catch (error) {
    const customError = error as ApiError;
    return errorHandler(customError, request, response);
  }
};

export const signUp = async (request: Request, response: Response) => {
  const body = request.body as RegistrationBodyParams;
  try {
    const userInfo = await service.signUp(body);
    if (userInfo) {
      const tokens = generateTokens({ ...userInfo });
      response.cookie(
        'accessToken', tokens.accessToken,
        { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 10, secure: true}
      );
      response.cookie(
        'refreshToken', tokens.refreshToken,
        { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 10, secure: true }
      );
      response.status(StatusCodes.OK).send({
        id: userInfo.id,
        name: userInfo.name,
        surname: userInfo.surname,
        email: userInfo.email,
      });
    }
  } catch (error) {
    const customError = error as ApiError;
    return errorHandler(customError, request, response);
  }
};

export const logout = async (_: Request, res: Response) => {
  try {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.status(StatusCodes.OK).json({ message: 'Successfully logged out' });
  } catch (error) {
    const customError = error as ApiError;
    return errorHandler(customError, request, response);
  }
};

export const refresh = async (request: Request, response: Response) => {
  try {
    const { refreshToken } = request?.cookies;
    if (!refreshToken) {
      const customError = new ApiError({
        message: 'Wrong refresh token',
        statusCode: StatusCodes.BAD_REQUEST,
        name: 'Refresh token error'
      });
      return errorHandler(customError, request, response);
    }

    const { tokens, userInfo } = await refreshService(refreshToken);
    response.cookie(
      'accessToken', tokens.accessToken,
      { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 10, secure: true}
    );
    response.cookie(
      'refreshToken', tokens.refreshToken,
      { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 10, secure: true}
    );
    response.status(StatusCodes.OK).send(userInfo);
  } catch (error) {
    const customError = new ApiError({
      message: 'Wrong refresh token',
      statusCode: StatusCodes.BAD_REQUEST,
      name: 'Refresh token error'
    });
    return errorHandler(customError, request, response);
  }
};

export const getProfile = async (request: Request, response: Response) => {
  try {
    const { accessToken } = request.cookies;
    if (!accessToken) {
      throw new ApiError({
        message: 'Unauthorized',
        statusCode: StatusCodes.UNAUTHORIZED,
        name: 'Token error'
      });
    }
    const userData = jwt.verify(accessToken, environment.JWT_ACCESS_TOKEN);
    return response.status(StatusCodes.OK).send(userData);
  } catch (error) {
    const customError = new ApiError({
      message: 'Unauthorized',
      statusCode: StatusCodes.UNAUTHORIZED,
      name: 'Token error'
    }) as ApiError;
    return errorHandler(customError, request, response);
  }
};
