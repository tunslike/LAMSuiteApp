import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeScreen, 
         LoginScreen, 
         SliderScreen, 
         CreateAccountScreen, 
         VerifyPhoneScreen,
         CreatePINScreen, 
         AccountSetupScreen, 
         AccountTypeScreen } from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Slider' component={SliderScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='CreateAccount' component={CreateAccountScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='VerifyPhone' component={VerifyPhoneScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='CreatePIN' component={CreatePINScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='AccountType' component={AccountTypeScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='AccountSetup' component={AccountSetupScreen} options={{animation: 'slide_from_right'}} />
        </Stack.Navigator>
    )
}

export default AuthStack;