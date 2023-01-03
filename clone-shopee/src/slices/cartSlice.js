import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: JSON.parse(localStorage.getItem('carts')) || [],
}

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getAllCart: (state, action) => {
            state.carts = action.payload
            localStorage.setItem('carts', JSON.stringify(action.payload));
        },
        remove: (state, action) => {
            console.log(action.payload);
        },
        removeAll: (state, action) => {
            state.carts = []
            localStorage.removeItem('carts');
        },
        addItem: (state, action) => {
            console.log(action.payload);
            // state.carts = action.payload
            // localStorage.setItem('carts', JSON.stringify(action.payload));
        },
    }
})

const { reducer, actions } = cart;
export const { getAllCart, removeAll, addItem } = actions;
export default reducer;