import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { User } from 'db/models';
import { APIError, ApiError } from 'resources/types';
import environment from 'resources/constants/environment';

export const validateAccessToken = async (accessToken: string) => {
  try {
    const userData = jwt.verify(accessToken, environment.JWT_ACCESS_TOKEN);
    return userData;
  } catch (error) {
    return null;
  }
};

export const validateRefreshToken = (refreshToken: string) => {
  try {
    const userData = jwt.verify(refreshToken, environment.JWT_REFRESH_TOKEN);
    return userData;
  } catch (error) {
    return null;
  }
};

export const generateTokens = (payload: string | object | Buffer | jwt.JwtPayload) => {
  const accessToken = jwt.sign(
    payload,
    environment.JWT_ACCESS_TOKEN,
    { expiresIn: '1h' },
  );
  const refreshToken = jwt.sign(
    payload,
    environment.JWT_REFRESH_TOKEN,
    { expiresIn: '30d' },
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const refreshService = async (refreshToken: string) => {
  try {
    const userInfo = validateRefreshToken(refreshToken);
    const { id } = userInfo as JwtPayload;
    const user = await User.findByPk(id);

    if (!userInfo || !user) {
      throw new ApiError({
        message: 'Wrong access token',
        statusCode: StatusCodes.UNAUTHORIZED,
        name: 'Access token error',
      });
    }

    const tokens = generateTokens({ ...user });
    return {
      tokens,
      userInfo,
    };
  } catch (error) {
    const { message, statusCode } = error as APIError;
    throw new ApiError({
      message,
      statusCode,
      name: '',
    });
  }
};
