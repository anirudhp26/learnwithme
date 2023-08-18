import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    mode: "light",
    token: null,
    user: null,
    blogs: [],
    notifications: [],
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
            state.notifications = [];
        },

        setBlogs: (state, action) => {
            state.blogs = action.payload.blogs;
        },

        setNotifications: (state, action) => {
            state.notifications = action.payload.notifications;
        },

        setUser: (state, action) => {
            state.user = action.payload.user;
        }
    }
});

export const { setMode, setLogin, setLogout, setBlogs, setNotifications, setUser } = authSlice.actions;

export default authSlice.reducer;
