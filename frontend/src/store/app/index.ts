import { VariantType, SnackbarOrigin } from 'notistack';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  notifier: {
    options?: {
      persist?: boolean | undefined,
      preventDuplicate?: boolean,
      autoHideDuration?: number | undefined,
      variant?: VariantType,
      anchorOrigin?: SnackbarOrigin,
    },
    message?: string,
  }
}

const initialState: AppState = {

  notifier: {
    options: {
      variant: 'info' as VariantType,
      persist: false,
      preventDuplicate: true,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      } as SnackbarOrigin,
    },
    message: '',
  },
};

/* eslint-disable no-param-reassign */

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reset: () => initialState,
    showMessage: (state, action: PayloadAction<AppState['notifier']>) => {
      const { message, options } = action.payload;

      const notifier = {
        ...initialState.notifier,
        message,
        options: { ...initialState.notifier.options, ...options },
      };

      state.notifier = notifier;
    },
  },
});

const { reset, showMessage } = appSlice.actions;

export { reset, showMessage };

export default appSlice;
