import { createSlice } from "@reduxjs/toolkit";

//set initial state
const initialState = {
    customerData: [],
    loanData: [],
    employerLoanProfile: [],
    customerEmployerDetails: [],
    approvedLoanAmount: '',
    bankAccountID: '',
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {
        updateBankAccountID: (state, action) => {
            state.bankAccountID = action.payload
        },
        updateApprovedloanAmount: (state, action) => {
            state.approvedLoanAmount = action.payload
        },
        updateCustomerEmployerDetails: (state, action) => {
            state.customerEmployerDetails = action.payload
        },
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
export const {updateCustomerData, 
              updateLoadData, 
              updateEmployerLoanProfile, 
              updateCustomerEmployerDetails,
              updateApprovedloanAmount,
              updateBankAccountID
            } = customerSlice.actions;

export default customerSlice.reducer;