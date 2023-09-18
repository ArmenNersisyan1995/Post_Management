import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ApiError } from "resources/types";
import service from  "service";
import { errorHandler } from "utils";

export const createPost = async (request: Request, response: Response) => {
  const { title, description } = request.body;
  const { id } = response.locals.userData;
  try {
    const postInfo = await service.createPost(title, description, id);
    return response.status(StatusCodes.OK).send(postInfo);
  } catch (error) {
    const customError = error as ApiError;
    return errorHandler(customError, request, response);
  }
};


export const deletePost = async (request: Request, response: Response) => {
  const { postId } = request.params;
  const { id } = response.locals.userData;
  try {
    const postInfo = await service.deletePos(postId, id);
    response.status(StatusCodes.OK).send(postInfo);
  } catch (error) {
    const customError = error as ApiError;
    return errorHandler(customError, request, response);
  }
};


export const getPosts = async (request: Request, response: Response) => {
  try {
    const posts = await service.getPosts(request.query);
    return response.status(StatusCodes.OK).send(posts);
  } catch (error) {
    const customError = error as ApiError;
    return errorHandler(customError, request, response);
  }
};

export const updatePost = async (request: Request, response: Response) => {
  try {
    const { postId } = request.params;
    const { title, description } = request.body;
    const { id } = response.locals.userData;
    const post = await service.updatePost(+(postId), title, description, id);
    return response.status(StatusCodes.OK).send(post);
  } catch (error) {
    const customError = error as ApiError;
    return errorHandler(customError, request, response);
  }
};
