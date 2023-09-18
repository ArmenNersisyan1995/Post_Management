export const routsPatterns: { [key: string]: string } = {
  DASHBOARD: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  SIGN_OUT: '/sign-out',
  PROFILE: '/profile',
  POSTS: '/posts',
};

export interface URLParams {
  POST_ID: string
}

export const urlParams: URLParams = {
  POST_ID: 'postId',
};

export const queries: { [key: string]: string } = {
  PAGE: 'page',
  SIZE: 'size',
  SEARCH: 'search',
  OWNER_ID: 'ownerId',
};

export const ROWS_PER_PAGES: Array<number> = [20, 50, 100];

export * from './endpoints';
export * from './configs';
