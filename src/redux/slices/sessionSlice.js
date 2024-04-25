import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
    name: 'session',

    initialState: {
        uuid: null,
        publicKey: null,
    },

    reducers: {
        setSession: (state, action) => {
            state.uuid = action.payload.uuid
            state.publicKey = action.payload.publicKey
        },
    },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice;
