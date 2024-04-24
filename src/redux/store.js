import { configureStore } from '@reduxjs/toolkit';
import messageSlice from './slices/messageSlice';
import themeSlice from './slices/themeSlice';
import userSlice from './slices/userSlice';
import clouseAndroidSlice from './slices/clouseAndroidSlice';


const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    message: messageSlice.reducer,
    user: userSlice.reducer,
    clouseAndroid: clouseAndroidSlice.reducer
  },
});

export default store;
