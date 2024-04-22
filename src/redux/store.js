import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import messageSlice from './slices/messageSlice';

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    message: messageSlice.reducer,
  }
});

export default store;