import { Router } from 'express';
import {
  signIn,
  logout,
  refresh,
  signUp,
  getProfile,
} from 'controllers/user';

import { endpoints } from 'resources/constants/endpoints';
import { validateSignInQuery, validateSignUpQuery } from 'validations';
import { userAuth } from 'middleware';

const User = Router();

User.post(endpoints.SIGN_IN, validateSignInQuery, signIn);

User.post(endpoints.SIGN_OUT, logout);

User.post(endpoints.SIGN_UP, validateSignUpQuery, signUp);

User.get(endpoints.REFRESH_TOKEN, refresh);
User.use(userAuth);
User.get(endpoints.USER_PROFILE, getProfile);

export default User;
