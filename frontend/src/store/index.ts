import { configureStore } from '@reduxjs/toolkit';

import userSlice from './user';
import appSlice, { AppState, showMessage as showMessageAction } from './app';
import postSlice from './post';

const NOTIFIER_TIMEOUT: number = 10;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer,
  },
});

export const showMessage = (
  notifier: Omit<AppState['notifier'], 'message'> & { messages: Array<string> },
) => {
  notifier.messages.forEach((message) => {
    setTimeout(() => {
      store.dispatch(showMessageAction({ ...notifier, message }));
    }, NOTIFIER_TIMEOUT);
  });
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;

export { userSlice };
