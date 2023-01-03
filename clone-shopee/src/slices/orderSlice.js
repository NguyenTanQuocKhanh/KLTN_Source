import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: JSON.parse(localStorage.getItem('orders')) || [],
}

const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getAllOrder: (state, action) => {
            state.orders = action.payload
            localStorage.setItem('orders', JSON.stringify(action.payload));
        }
    }
})

const { reducer, actions } = order;
export const { getAllOrder } = actions;
export default reducer;