import { createSlice } from "@reduxjs/toolkit";

//set initial state
const initialState = {
    customerData: [],
    loanData: [],
    employerLoanProfile: [],
    customerEmployerDetails: [],
    approvedLoanAmount: '',
    bankAccountID: '',
    bankAccountDetails: '',
    biodata: 0,
    empdata: 0,
    nokdata: 0,
    docdata: 0,

}

export const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {
        updateBiodataStatus: (state, action) => {
            state.biodata = action.payload
        },
        updateEmpdataStatus: (state, action) => {
            state.empdata = action.payload
        },
        updateNOKdataStatus: (state, action) => {
            state.nokdata = action.payload
        },
        updateDOCdataStatus: (state, action) => {
            state.docdata = action.payload
        },
        updateBankAccountID: (state, action) => {
            state.bankAccountID = action.payload
        },
        updateBankAccountDetails: (state, action) => {
            state.bankAccountDetails = action.payload
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
              updateBankAccountID, 
              updateBiodataStatus, 
              updateEmpdataStatus, 
              updateDOCdataStatus,
              updateNOKdataStatus, updateBankAccountDetails
            } = customerSlice.actions;

export default customerSlice.reducer;