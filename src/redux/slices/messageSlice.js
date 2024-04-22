import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        message: null
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        removeMessage: (state) => {
            state.message = null;
        }
    }
});

export const { setMessage, removeMessage } = messageSlice.actions;
export default messageSlice;
