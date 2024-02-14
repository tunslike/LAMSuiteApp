import { createSlice } from "@reduxjs/toolkit";

//set initial state
const initialState = {
    fullname: '',
    email: '',
    phone: '',
    account_type: '',
    pinNumber: '',
    customerEntryID: '',
    employerProfileID: '',
    completedBioData: '',
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        updateCompletedBioData: (state, action) => {
            state.completedBioData = action.payload
        },
        updateEmployerProfileID: (state, action) => {
            state.employerProfileID = action.payload
        },
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
        updateCustomerEntryID: (state, action) => {
            state.customerEntryID = action.payload
        }
    },
})

export const {updateEmail, updateFullname, 
             updateAccountType, updatePhone, 
             updatePinNumber, updateCustomerEntryID, 
             updateEmployerProfileID, updateCompletedBioData} = accountSlice.actions;

export default accountSlice.reducer;