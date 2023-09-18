import { StatusCodes } from 'http-status-codes';

import { Post } from 'db/models';
import { APIError, ApiError } from 'resources/types';
import { Request } from 'express';

export const createPost = async (
  title: string,
  description: string,
  userId: number,
) => {
  try {
    const postInfo = await Post.create({
      title,
      description,
      userId,
    });
    return postInfo;
  } catch (error) {
    const { message, statusCode } = error as APIError;
    throw new ApiError({
      message,
      statusCode,
      name: '',
    });
  }
};

export const deletePos = async (ownerId: string, userId: number) => {
  try {
    const post = await Post.findByPk(ownerId);
    if (post && post?.dataValues.userId === userId) {
      return await post.destroy();
    }
    throw new ApiError({
      message: 'Not Found',
      statusCode: StatusCodes.NOT_FOUND,
      name: '',
    });
  } catch (error) {
    const { message, statusCode } = error as APIError;
    throw new ApiError({
      message,
      statusCode,
      name: '',
    });
  }
};

export const getPosts = async (query: Request['query']) => {
  try {
    const limit = Number(query.limit) || 20;
    const offset = Number(query.offset) * limit || 0;
    const ownerId = Number(query.ownerId) || null;
    if (ownerId) {
      return await Post.findAndCountAll({ where: { userId: ownerId }, offset, limit });
    }
    return await Post.findAndCountAll({ offset, limit });
  } catch (error) {
    throw new ApiError({
      message: 'Not Found',
      statusCode: StatusCodes.NOT_FOUND,
      name: '',
    });
  }
};

export const updatePost = async (
  postId: number,
  title: string,
  description: string,
  userId: number,
) => {
  try {
    const post = await Post.findByPk(postId);
    if (post) {
      if (post.dataValues.userId === userId) {
        await Post.update(
          {
            title,
            description,
          },
          {
            where: { id: postId },
          },
        );
        return await Post.findByPk(postId);
      }
      throw new ApiError({
        message: 'Permission dined',
        statusCode: StatusCodes.FORBIDDEN,
        name: '',
      });
    }
    throw new ApiError({
      message: 'Not Found',
      statusCode: StatusCodes.NOT_FOUND,
      name: '',
    });
  } catch (error) {
    const { message, statusCode } = error as APIError;
    throw new ApiError({
      message,
      statusCode,
      name: '',
    });
  }
};
