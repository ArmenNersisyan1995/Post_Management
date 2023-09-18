import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { Posts } from 'resources/types';
import {
  getPosts,
  deletePost,
  updatePost,
  createPost,
} from './thunk';

export interface postState {
  data: Posts,
  loading: boolean,
}

const initialState: postState = {
  data: {
    rows: [],
    count: 0,
  },
  loading: false,
};

/* eslint-disable no-param-reassign */

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addMatcher(isAnyOf(
      deletePost.pending,
      updatePost.pending,
      createPost.pending,
    ), (state) => {
      state.loading = true;
    });

    builder.addMatcher(isAnyOf(
      deletePost.rejected,
      deletePost.fulfilled,
      updatePost.rejected,
      updatePost.fulfilled,
      createPost.rejected,
      createPost.fulfilled,
    ), (state) => {
      state.loading = false;
    });
  },
});

const { reset } = postSlice.actions;

export {
  reset,
  getPosts,
  updatePost,
  createPost,
};

export default postSlice;
