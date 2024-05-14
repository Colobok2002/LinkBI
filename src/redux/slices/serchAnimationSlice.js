import { createSlice } from '@reduxjs/toolkit';

const serchAnimationSlice = createSlice({
    name: 'serchAnimationSlice',

    initialState: {
        serch: false,
    },

    reducers: {
        updateSerch: (state, action) => {
            if (action.payload == true || action.payload == false) {
                state.serch = action.payload
            } else {
                state.serch = !state.serch
            }
        },
    },
});

export const { updateSerch } = serchAnimationSlice.actions;
export default serchAnimationSlice;
