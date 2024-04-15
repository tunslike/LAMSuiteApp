import React, {createContext, useState, useEffect} from 'react';
import {Alert, Keyboard } from 'react-native';
import axios from 'axios';
import {APIBaseUrl} from '../constants';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
            updateCustomerData, 
            updateLoadData, 
            updateCustomerEmployerDetails, 
            updateEmployerLoanProfile, 
            updateBiodataStatus, 
            updateDOCdataStatus, 
            updateEmpdataStatus,
            updateNOKdataStatus
        } from '../store/customerSlice';

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {

    const dispatch = useDispatch();

    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [customerFullname, setCustomerFullname] = useState(null)

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
              console.log(response.data.response);

              if(response.data.response.responseCode == '200') {

                   console.log('****************/ LOGIN WAS SUCCESSFUL /********************')

                   dispatch(updateCustomerData(response.data.customer))
                   dispatch(updateLoadData(response.data.activeLoan))
                   dispatch(updateEmployerLoanProfile(response.data.employerloanProfile))
                   dispatch(updateCustomerEmployerDetails(response.data.customerEmployerDetails))

                   dispatch(updateBiodataStatus(response.data.customer.is_RECORD_FOUND ? 1 : 0))
                   dispatch(updateEmpdataStatus(response.data.customer.is_EMPLOYER_FOUND ? 1 : 0))
                   dispatch(updateNOKdataStatus(response.data.customer.is_NOK_FOUND ? 1 : 0))
                   dispatch(updateDOCdataStatus(response.data.customer.is_DOCUMENT_FOUND ? 1 : 0))

                   AsyncStorage.setItem('userLogged', response.data.customer.customer_ENTRY_ID);

                   setCustomerFullname(response.data.customer.full_NAME);
                   setUserToken(response.data.customer.customer_ENTRY_ID);
                   
              }else {

                setIsLoading(false)
                Alert.alert("Finserve", "Incorrect Username or Pin Number!")
                return;
              }
          })
          .catch(error => {
  
              setIsLoading(false);
              setErrorMessage('Service is unavailable, please retry!')
              Alert.alert("Finserve", "Incorrect Username or Pin Number!")
  
              console.log(error);
          });

    }
    // END OF FUNCTION

    // FUNCTION TO LOGOUT USER
      const ExitAuthenticatedUser = async () => {

        try{
    
            // disable tokens
            setUserToken(null)

        }catch(exception) {
            console.log(exception)
        }
    }// END OF FUNCTION

    return(
        <AuthContext.Provider value={{
                                        userToken, 
                                        ValidateCustomerLogin, 
                                        isLoading,
                                        customerFullname,
                                        ExitAuthenticatedUser
                                    }}>
            {children}
        </AuthContext.Provider>
    )
}