import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    mode: "light",
    token: null,
    user: null,
    blogs: [],
};

export const authSlice = createSlice({
    name: "auth",
    defaultState,
    reducers: {

        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.mode = "light";
            state.blogs = [];
        },

        setBlogs: (state, action) => {
            state.blogs = action.payload.blogs;
        },
    }
});

export const { setMode, setLogin, setLogout, setBlogs } = authSlice.actions;

export default authSlice.reducer;
