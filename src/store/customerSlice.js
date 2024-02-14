import { createSlice } from "@reduxjs/toolkit";

//set initial state
const initialState = {
    customerData: [],
    loanData: [],
    employerLoanProfile: []
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {
        updateCustomerData: (state, action) => {
            state.customerData = action.payload
        },
        updateLoadData: (state, action) => {
            state.loanData = action.payload
        },
        updateEmployerLoanProfile: (state, action) => {
            state.employerLoanProfile = action.payload
        }
    },
})
export const {updateCustomerData, updateLoadData, updateEmployerLoanProfile} = customerSlice.actions;

export default customerSlice.reducer;