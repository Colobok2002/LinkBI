import { createSlice } from '@reduxjs/toolkit';

const themes = {
    light: {
        backgroundColor: '#ffffff',
        textColor: '#CFCFCF',
        activeItems : "#43464B",
    },
    dark: {
        backgroundColor: '#43464B',
        textColor: '#CFCFCF',
        activeItems : "#ffffff",
    }
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        currentTheme: 'dark',
        styles: themes.light,
    },
    reducers: {
        toggleTheme: (state) => {
            const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
            state.currentTheme = newTheme;
            state.styles = themes[newTheme];
        }
    }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice;
