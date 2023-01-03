import { configureStore } from "@reduxjs/toolkit";
import authReducer from "~/slices/authSlice"
import cartReducer from "~/slices/cartSlice"
import cateReducer from "~/slices/categorySlice"
import brandReducer from "~/slices/brandSlice"
import productReducer from "~/slices/productSlice"
import orderReducer from "~/slices/orderSlice"
import addressReducer from "~/slices/addressSlice"

const rootReducer = {
    auth: authReducer,
    cart: cartReducer,
    category: cateReducer,
    brand: brandReducer,
    product: productReducer,
    order: orderReducer,
    address: addressReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;