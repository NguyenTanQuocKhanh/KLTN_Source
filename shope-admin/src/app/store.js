import { configureStore } from "@reduxjs/toolkit";
import authReducer from "~/slices/authSlice"

const rootReducer = {
    auth: authReducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store;