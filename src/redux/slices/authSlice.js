import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        auth: false,
    },

    reducers: {
        login: (state) => {
            state.auth = true
        },
        loginOut: (state) => {
            state.auth = false
        },
    },
});

export const {
    login, loginOut
} = authSlice.actions;
export default authSlice;
