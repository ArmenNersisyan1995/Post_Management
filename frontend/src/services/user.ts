import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { endpoint } from 'resources/constants';
import { SignInData, SignUpData, User } from 'resources/types';
import instance from 'axiosInstance';

export const getProfile = (): Promise<AxiosResponse<User>> => (
  instance.get(endpoint.USER_PROFILE)
    .then((response: AxiosResponse) => response)
    .catch((error) => Promise.reject(error))
);

export const signIn = (signInData: SignInData): Promise<User> => {
  const requestConfig: AxiosRequestConfig = { failureMessage: 'Unable to sign in' };
  return (
    instance.post(endpoint.SIGN_IN, signInData, requestConfig)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => Promise.reject(error))
  );
};

export const signUp = (signUpData: SignUpData): Promise<User> => {
  const requestConfig: AxiosRequestConfig = { failureMessage: 'Duplicated email address' };
  return (
    instance.post(endpoint.SIGN_UP, signUpData, requestConfig)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => Promise.reject(error))
  );
};

export const signOut = (): Promise<unknown> => {
  const requestConfig: AxiosRequestConfig = {};
  return (
    instance.post(endpoint.SIGN_OUT, requestConfig)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => Promise.reject(error))
  );
};
