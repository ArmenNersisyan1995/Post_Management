import { AxiosResponse } from 'axios';
import { endpoint } from 'resources/constants';
import { PostQueryParams, Posts, PostBody } from 'resources/types';
import instance from '../axiosInstance';

export const getPosts = (
  queryParams?: PostQueryParams,
): Promise<AxiosResponse<Posts>> => instance.get(
  endpoint.POSTS,
  { params: queryParams },
).then((response: AxiosResponse) => response).catch((error) => Promise.reject(error));

export const deletePost = (id: number): Promise<AxiosResponse<Posts>> => instance.delete(
  endpoint.POST(id),
  {
    successMessage: 'Successfully deleted',
    failureMessage: 'Failed',
  },
).then((response: AxiosResponse) => response).catch((error) => Promise.reject(error));

export const updatePost = (id: number, data: PostBody) => {
  const { title, description } = data;
  return instance.put(
    endpoint.POST(id),
    { title, description },
    {
      successMessage: 'Successfully updated',
      failureMessage: 'Failed',
    },
  );
};

export const createPost = (data: PostBody) => {
  const { title, description } = data;
  return instance.post(
    endpoint.POSTS,
    { title, description },
    {
      successMessage: 'Successfully created',
      failureMessage: 'Failed',
    },
  );
};
