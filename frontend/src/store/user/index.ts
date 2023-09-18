import { createSlice } from '@reduxjs/toolkit';
import { User } from 'resources/types';
import {
  getProfile, signIn, signOut, signUp,
} from './thunk';

export interface UserState {
  profile: User | null
  loading: boolean,
}

const initialState: UserState = {
  profile: null,
  loading: false,
};

/* eslint-disable no-param-reassign */

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });

    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload as User;
    });

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload as User;
    });

    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(signOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.profile = null;
    });
    builder.addCase(signOut.rejected, (state) => {
      state.loading = false;
    });
  },
});

const { reset } = userSlice.actions;

export {
  reset,
  signIn,
  signUp,
  getProfile,
};

export default userSlice;
