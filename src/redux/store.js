import { configureStore } from '@reduxjs/toolkit';
import messageSlice from './slices/messageSlice';
import themeSlice from './slices/themeSlice';

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    message: messageSlice.reducer,
  }
});

export default store;