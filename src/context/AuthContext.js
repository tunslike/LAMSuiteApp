import React, {createContext, useState, useEffect} from 'react';
import { Keyboard } from 'react-native';
import axios from 'axios';
import {APIBaseUrl} from '../constants';

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {

    const [userToken, setUserToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);

    // FUNCTION TO VALIDATE USER LOGIN
    const ValidateCustomerLogin = (customerEntry, customerAccessCode) => {

        setErrorMessage(null)

        if(customerEntry == '' || customerAccessCode == '') {
            setErrorMessage('Please enter your Email Address and PIN Number to proceed!');
            return;
        }

        //DISMISS KEYBOARD
        Keyboard.dismiss();

        setIsLoading(true);

        const options = {
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8082'
            }
          };

        const data = {
            username: customerEntry,
            pinNumber: customerAccessCode
          };
        
          axios.post(APIBaseUrl.developmentUrl + 'customer/login', data, options)
          .then(response => {
  
              setIsLoading(false);

              console.log(response.data.response);

              if(response.data.response.responseCode == '200') {
  
                   console.log('****************/ LOGIN WAS SUCCESSFUL /********************')
                   setUserToken(response.data.customer.customer_ENTRY_ID)
                   
              }else {
  
                  console.log(response.data.statusMessage)
                  //show error message
                  setErrorMessage(response.data.statusMessage);
  
                  //set loading off
                  setIsLoading(false)
  
                  return;
              }
          })
          .catch(error => {
  
              setIsLoading(false);
              setErrorMessage('Service is unavailable, please retry!')
  
              console.log(error);
          });



    }
    // END OF FUNCTION

    return(
        <AuthContext.Provider value={{
                                        userToken, 
                                        ValidateCustomerLogin, 
                                        isLoading
                                    }}>
            {children}
        </AuthContext.Provider>
    )
}