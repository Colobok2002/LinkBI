import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'message',

    initialState: {
        message: null,
        openModelAbout: false,
        isDragging: false,
    },

    reducers: {
        setOpenModelAbout: (state, action = null) => {
            if (action == null) {
                state.openModelAbout = !state.openModelAbout;
            } else {

                state.openModelAbout = action.payload
            }
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        removeMessage: (state) => {
            state.message = null;
        },
        setIsDragging: (state, action) => {
            state.isDragging = action.payload;
        },
    }
});

export const { setMessage, removeMessage, setOpenModelAbout, setIsDragging } = messageSlice.actions;
export default messageSlice;
