import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: JSON.parse(localStorage.getItem('categories')) || [],
}

const category = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getAllCate: (state, action) => {
            state.categories = action.payload
            localStorage.setItem('categories', JSON.stringify(action.payload));
        }
    }
})

const { reducer, actions } = category;
export const { getAllCate } = actions;
export default reducer;