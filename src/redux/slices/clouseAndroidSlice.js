    import { createSlice } from '@reduxjs/toolkit';

    const clouseAndroidSlice = createSlice({
        name: 'clouseAndroid',

        initialState: {
            translateX: 0,
        },

        reducers: {
            setTranslateX: (state, action) => {
                state.translateX = action.payload
            },
        },
    });

    export const { setTranslateX } = clouseAndroidSlice.actions;
    export default clouseAndroidSlice;
