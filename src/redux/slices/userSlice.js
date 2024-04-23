import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        isLoggedIn: false,
        userData: {}
    },
    reducers: {
        setAuthenticated: (state) => {
            state.isAuthenticated = true;
        },
        delAuthenticated: (state) => {
            state.isAuthenticated = false;
            SecureStore.deleteItemAsync('userJWTToken');
        },
        setLoggedIn: (state) => {
            state.isLoggedIn = true;
        },
        delLoggedIn: (state) => {
            state.isLoggedIn = false;
        },
    },
});

export const { setAuthenticated, delAuthenticated, setLoggedIn, delLoggedIn } = userSlice.actions;

export default userSlice;
