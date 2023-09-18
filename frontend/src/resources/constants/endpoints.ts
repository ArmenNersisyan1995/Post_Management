import { configs } from 'resources/constants/configs';

export const REQUEST_TIMEOUT: number = 300000;

export const API_URL: string = configs.apiUrl.development;

export const API_PREFIX: string = 'api/';

export const endpoint = {
  USER_PROFILE: `${API_PREFIX}user/profile`,
  SIGN_IN: `${API_PREFIX}user/sign-in`,
  SIGN_UP: `${API_PREFIX}user/sign-up`,
  SIGN_OUT: `${API_PREFIX}user/sign-out`,
  REFRESH_TOKEN: `${API_PREFIX}user/refresh`,
  POSTS: `${API_PREFIX}posts`,
  POST: (id: number) => `${API_PREFIX}posts/${id}`,
};
