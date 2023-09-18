import { AxiosRequestConfig } from 'axios';
import instance from '../axiosInstance';
import {
  getPosts, deletePost, updatePost, createPost,
} from './post';
import {
  getProfile, signIn, signUp, signOut,
} from './user';

export interface RequestConfig extends AxiosRequestConfig {
  failureMessage?: string
  successMessage?: string
}

export default {
  instance,
  getPosts,
  getProfile,
  signIn,
  signUp,
  signOut,
  updatePost,
  deletePost,
  createPost,
};
