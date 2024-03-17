import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeScreen, 
         LoginScreen, 
         SliderScreen, 
         CreateAccountScreen, 
         VerifyPhoneScreen,
         CreatePINScreen, 
         AccountSetupScreen, 
         AccountTypeScreen,
         AccountCreatedScreen,
         BioDataScreen,
         PersonalDetailsScreen,
         EmployerDetailsScreen,
         NOKDetailsScreen,
         DocumentUploadScreen,
         KYCCompleteScreen,
         ForgotPassword
        } from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Slider' component={SliderScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='CreateAccount' component={CreateAccountScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='VerifyPhone' component={VerifyPhoneScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='CreatePIN' component={CreatePINScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='AccountType' component={AccountTypeScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='AccountSetup' component={AccountSetupScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='BiodataUpdate' component={BioDataScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='PersonalDetails' component={PersonalDetailsScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='EmployerDetails' component={EmployerDetailsScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='NOKDetails' component={NOKDetailsScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='KYCDataCompleted' component={KYCCompleteScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name='DocumentUpload' component={DocumentUploadScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='AccountCreated' component={AccountCreatedScreen} options={{animation: 'slide_from_right'}} />
        </Stack.Navigator>
    )
}

export default AuthStack;