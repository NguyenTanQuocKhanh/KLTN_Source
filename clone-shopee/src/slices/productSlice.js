import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resultSearchProduct: JSON.parse(localStorage.getItem('resultSearchProduct')) || [],
    keyword: ''
}

const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        searching: (state, action) => {
            const { keyword, resultSearchProduct } = action.payload;
            state.keyword = keyword
            state.resultSearchProduct = resultSearchProduct
        },
    }
})

const { reducer, actions } = product;
export const { searching } = actions;
export default reducer;