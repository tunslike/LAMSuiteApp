import React, { useState } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, 
  Alert,
  ScrollView,
  Dimensions} from 'react-native';
  import axios from 'axios';
  import { useSelector, useDispatch } from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { GreenCheckBox, BreakdownEntry, Loader, InnerHeader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HistoryScreen = ({navigation}) => {

  // CUSTOMER STORE
  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);
  const accountNumberID = useSelector((state) => state.customer.bankAccountID);

  // STATES
  const [isLoading, setIsLoading] = useState(false)

  

    // functiont to submit client loan request
    const submitCustomerLoanRequest = () => {

      //data
    const data = {
      customerID : customerID,
      loanAmount : loanAmt,
      loanTenor : loanSetTenor,
      loanPurpose : loanSetPurpose,
      accountID : accountNumberID
  }

    console.log(data);

    setIsLoading(true);

      axios.post(APIBaseUrl.developmentUrl + 'loanService/submitCustomerLoanRequest',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {

        setIsLoading(false)
        
        if(response.data.responseCode == 200) {
  
            // SHOW SUCCESS
            navigation.navigate("LoanCompleted", {loanAmount:loanAmt, loanTenor:loanSetTenor});
            return
        
        }else{

          Alert.alert('Oops! Unable to process your request, please try again')

        }

      })
      .catch(error => {
        console.log(error);
      });
    }
    // end of function



  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>

      {isLoading &&
        <Loader title="Processing your request, please wait..." />
      }

      <InnerHeader onPress={() => navigation.goBack()} title="Transaction History" />

    

    </ScrollView>
  )
}

const styles = StyleSheet.create({

})

export default HistoryScreen;