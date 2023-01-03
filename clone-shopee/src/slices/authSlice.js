import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

//slice
import { getAll } from '~/slices/cartSlice';

//service
import * as cartService from '~/services/cartService';

const initialState = {
    token: JSON.parse(localStorage.getItem('token')) || null,
    isLogged: JSON.parse(localStorage.getItem('isLogged')) || false,
    userLogin: JSON.parse(localStorage.getItem('user-login')) || {},
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.isLogged = true;
            state.userLogin = user;

            // set local storage after login success
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('isLogged', true);
            localStorage.setItem('user-login', JSON.stringify(user));
        },
        logout: (state, action) => {
            state.token = null;
            state.isLogged = false;
            state.userLogin = {};
            // remove local storage 
            localStorage.removeItem('token')
            localStorage.removeItem('isLogged');
            localStorage.removeItem('user-login');
        },
        update: (state, action) => {
            state.userLogin = action.payload;
            localStorage.setItem('user-login', JSON.stringify(action.payload));
        }
    }
})

const { reducer, actions } = auth;
export const { login, logout, update } = actions;
export default reducer;