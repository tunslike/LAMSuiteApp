import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './accountSlice';
import customerReducer from './customerSlice';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    }
})
