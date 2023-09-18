import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { User } from 'db/models';
import { ApiError } from 'resources/types';
import { RegistrationBodyParams } from 'resources/types/user';

export const signUp = async (body: RegistrationBodyParams) => {
  try {
    const {
      email, password, name, surname,
    } = body;
    const hashPassword = await bcrypt.hash(password, 3);
    const userInfo = await User.create({
      email,
      password: hashPassword,
      name,
      surname,
    });
    return { ...userInfo.dataValues };
  } catch (error) {
    throw new ApiError({
      message: "Duplicate entry for key 'user.email",
      name: 'Authorization error',
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
};

export const signIn = async (
  email: string,
  password: string,
) => {
  try {
    const userInfo = await User.findOne({
      where: { email },
    });

    if (!userInfo) {
      throw new ApiError({
        message: 'Email does note exist',
        statusCode: StatusCodes.NOT_ACCEPTABLE,
        name: 'Authorization error',
      });
    }
    const isPassEquals = await bcrypt.compare(password, userInfo.password);

    if (!isPassEquals) {
      throw new ApiError({
        message: 'Invalid Password',
        statusCode: StatusCodes.NOT_ACCEPTABLE,
        name: 'Authorization error',
      });
    }
    return { ...userInfo.dataValues, password: null };
  } catch (error) {
    throw new ApiError({
      message: 'Authorization error',
      name: 'Authorization error',
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
};
