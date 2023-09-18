import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { User } from 'db/models';
import environment from 'resources/constants/environment';

const userAuth = async (request: Request, response: Response, next: NextFunction) => {
  const { accessToken } = request.cookies;
  try {
    const decoded = jwt.decode(accessToken) as jwt.JwtPayload;
    const user = await User.findByPk(decoded?.id);
    const userData = jwt.verify(accessToken, environment.JWT_ACCESS_TOKEN);
    if (!decoded || !userData || !user) {
      return response.status(StatusCodes.UNAUTHORIZED).end();
    }
    response.locals = { ...response.locals, userData };
    return next();
  } catch (error) {
    return response.status(StatusCodes.UNAUTHORIZED).json(error);
  }
};

export default userAuth;
