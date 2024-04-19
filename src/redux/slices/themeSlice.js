import { createSlice } from '@reduxjs/toolkit';

const themes = {
    light: {
        tabBarActiveTintColor: "#6A0DAD",
        tabBarInactiveTintColor: "#43464B",
        tabBarBackgroundColor: "#FFFFFF",
        textColor: '#000000',
        backgroundColor: '#ffffff',
        buttonColor: '#dddddd',
        headerColor: '#eeeeee'
    },
    dark: {
        tabBarActiveTintColor: "#6A0DAD",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarBackgroundColor: "#43464B",
        textColor: '#ffffff',
        backgroundColor: '#43464B',
        buttonColor: '#555555',
        headerColor: '#222222'
    }
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        currentTheme: 'light',
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
