import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
    name: 'session',

    initialState: {
        uuid: null,
        publicKey: null,
        lokalPublicKey: null,
        lokalPprivatKey: null,
    },

    reducers: {
        setSession: (state, action) => {
            state.uuid = action.payload.uuid
            state.publicKey = action.payload.publicKey
        },
        setLokalKeys: (state, action) => {
            state.lokalPublicKey = action.payload.lokalPublicKey
            state.lokalPprivatKey = action.payload.lokalPprivatKey
        },
    },
});

export const { setSession, setLokalKeys } = sessionSlice.actions;
export default sessionSlice;
