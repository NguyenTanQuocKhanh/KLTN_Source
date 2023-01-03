import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addresses: JSON.parse(localStorage.getItem('addresses')) || [],
}

const address = createSlice({
    name: 'address',
    initialState,
    reducers: {
        getAllAddress: (state, action) => {
            state.addresses = action.payload
            localStorage.setItem('addresses', JSON.stringify(action.payload));
        }
    }
})

const { reducer, actions } = address;
export const { getAllAddress } = actions;
export default reducer;