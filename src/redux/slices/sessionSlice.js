import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
    name: 'session',

    initialState: {
        uuid: null,
        publicKey: null,
        privatKey : null,
    },

    reducers: {
        setSession: (state, action) => {
            state.uuid = action.payload.uuid
            state.publicKey = action.payload.publicKey
            state.privatKey = action.payload.privatKey
        },
    },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice;
