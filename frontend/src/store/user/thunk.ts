import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInData, SignUpData, User } from 'resources/types';
import service from 'services';

const GET_PROFILE = 'user/getProfile';
const USER_SIGN_IN = 'user/sign-in';
const USER_SIGN_UP = 'user/sign-up';
const USER_SIGN_OUT = 'user/sign-out';

const getProfile = createAsyncThunk(
  GET_PROFILE,
  async (): Promise<User> => {
    const response = await service.getProfile();
    return response.data;
  },
);

const signIn = createAsyncThunk(
  USER_SIGN_IN,
  async (signInData: SignInData): Promise<User> => {
    const signInResponse: User = await service.signIn(signInData);
    return signInResponse;
  },
);

const signUp = createAsyncThunk(
  USER_SIGN_UP,
  async (signUpData: SignUpData): Promise<User> => {
    const responseSignUp: User = await service.signUp(signUpData);
    return responseSignUp;
  },
);

const signOut = createAsyncThunk(
  USER_SIGN_OUT,
  async (): Promise<unknown> => {
    await service.signOut();
    return Promise.resolve();
  },
);

export {
  signIn,
  signUp,
  signOut,
  getProfile,
};
