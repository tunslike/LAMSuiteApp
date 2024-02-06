import { createSlice } from "@reduxjs/toolkit";

//set initial state
const initialState = {
    accountData: [],
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        updateAccountData: (state, action) => {
            state.accountData = [...state.accountData, action.payload]
            console.log(state.accountData.length)
        }
    },
})

export const {updateAccountData} = accountSlice.actions;

export default accountSlice.reducer;