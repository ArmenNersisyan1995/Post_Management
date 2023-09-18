import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostQueryParams, Posts, PostBody } from 'resources/types';
import service from 'services';

const GET_POSTS = 'post/get';
const DELETE_POST = 'post/delete';
const UPDATE_POST = 'post/update';
const CREATE_POST = 'post/create';

const getPosts = createAsyncThunk(
  GET_POSTS,
  async (queryParams?: PostQueryParams): Promise<Posts> => {
    const response = await service.getPosts(queryParams);
    return response?.data;
  },
);

const deletePost = createAsyncThunk(
  DELETE_POST,
  async (id: number): Promise<Posts> => {
    const response = await service.deletePost(id);
    return response?.data;
  },
);

const updatePost = createAsyncThunk(
  UPDATE_POST,
  async (params: { id: number, data: PostBody }): Promise<Posts> => {
    const { id, data } = params;
    const response = await service.updatePost(id, data);
    return response?.data;
  },
);

const createPost = createAsyncThunk(
  CREATE_POST,
  async (data: PostBody): Promise<Posts> => {
    const response = await service.createPost(data);
    return response?.data;
  },
);

export {
  getPosts,
  deletePost,
  updatePost,
  createPost,
};
