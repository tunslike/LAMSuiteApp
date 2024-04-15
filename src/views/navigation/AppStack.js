import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {    DashboardScreen, 
            NewLoanScreen, 
            LoanConfirmationScreen,
            LoanCompleted,
            DisbursementAccount,
            LoanDetailsScreen,
            LoanRepaymentScreen,
            BuyAirtimeScreen,
            BuyDataScreen,
            KYCStatusScreen,
            PersonalDetailsScreen,
            EmployerDetailsScreen,
            NOKDetailsScreen,
            DocumentUploadScreen,
            KYCCompleteScreen,
            BankTransferRepayment
        } from '../screens';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='Tab' component={TabNavigator} />
            <Stack.Screen name='Dashboard' component={DashboardScreen} />
            <Stack.Screen name='NewLoan' component={NewLoanScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='ManageLoan' component={NewLoanScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='KYCStatus' component={KYCStatusScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='RepayLoan' component={LoanRepaymentScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='BuyAirtime' component={BuyAirtimeScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='BuyData' component={BuyDataScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='LoanDetails' component={LoanDetailsScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='AddDisburseAccount' component={DisbursementAccount} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name='BankTransfer' component={BankTransferRepayment} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name='ConfirmLoan' component={LoanConfirmationScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='LoanCompleted' component={LoanCompleted} options={{animation: 'slide_from_down'}} />
            <Stack.Screen name='PersonalDetails' component={PersonalDetailsScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='EmployerDetails' component={EmployerDetailsScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='NOKDetails' component={NOKDetailsScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='KYCDataCompleted' component={KYCCompleteScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name='DocumentUpload' component={DocumentUploadScreen} options={{animation: 'slide_from_right'}} />
        </Stack.Navigator>
    )
}

export default AppStack;