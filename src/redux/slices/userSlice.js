import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        isLoggedIn: false,
        userData: {},
        activeChatId: null,
    },
    reducers: {
        setAuthenticated: (state) => {
            state.isAuthenticated = true;
        },
        delAuthenticated: (state) => {
            state.isAuthenticated = false;
            SecureStore.deleteItemAsync('userToken');
        },
        setLoggedIn: (state) => {
            state.isLoggedIn = true;
        },
        delLoggedIn: (state) => {
            state.isLoggedIn = false;
        },
        setActiveChat: (state, action) => {
            state.activeChatId = action.payload;
        },
    },
});

export const { setAuthenticated, delAuthenticated, setLoggedIn, delLoggedIn, setActiveChat } = userSlice.actions;

export default userSlice;
