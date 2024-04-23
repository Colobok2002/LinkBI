import { configureStore } from '@reduxjs/toolkit';
import messageSlice from './slices/messageSlice';
import themeSlice from './slices/themeSlice';
import userSlice from './slices/userSlice';


const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    message: messageSlice.reducer,
    user: userSlice.reducer
  },
});

export default store;
