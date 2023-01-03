import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brands: JSON.parse(localStorage.getItem('brands')) || [],
}

const brand = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        getAllBrand: (state, action) => {
            state.brands = action.payload
            localStorage.setItem('brands', JSON.stringify(action.payload));
        }
    }
})

const { reducer, actions } = brand;
export const { getAllBrand } = actions;
export default reducer;