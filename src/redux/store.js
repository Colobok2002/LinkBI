import { configureStore } from '@reduxjs/toolkit';
import messageSlice from './slices/messageSlice';
import themeSlice from './slices/themeSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    message: messageSlice.reducer,
    auth: authSlice.reducer
  },
});

export default store;
