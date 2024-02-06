import { createSlice } from "@reduxjs/toolkit";

//set initial state
const initialState = {
    fullname: '',
    email: '',
    phone: '',
    account_type: '',
    pinNumber: ''
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        updateFullname: (state, action) => {
            state.fullname = action.payload
        },
        updateEmail: (state, action) => {
            state.email = action.payload
        },
        updatePhone: (state, action) => {
            state.phone = action.payload
        },
        updateAccountType: (state, action) => {
            state.account_type = action.payload
        },
        updatePinNumber: (state, action) => {
            state.pinNumber = action.payload
        },
    },
})

export const {updateEmail, updateFullname, updateAccountType, updatePhone, updatePinNumber} = accountSlice.actions;

export default accountSlice.reducer;