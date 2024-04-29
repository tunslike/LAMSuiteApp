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
  import moment from 'moment';
  import { useSelector, useDispatch } from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { TransactionCarButton, Loader, InnerHeader } from '../../components';
  import { useFocusEffect } from '@react-navigation/native';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HistoryScreen = ({navigation}) => {

  // CUSTOMER STORE
  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);


  // STATES
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState('');

  // function to verify data
  const fetchTransactionDetails = () => {

    axios.get(APIBaseUrl.developmentUrl + 'customer/fetchTransaction?CustomerID=' +customerID,{},{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      console.log(response.data)

      setTransactions(response.data)

    })
    .catch(error => {
      console.log(error + "1");
    });

}// end of function 


useFocusEffect(
  React.useCallback(() => {
    fetchTransactionDetails();
  }, [])
);


  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>

      {isLoading &&
        <Loader title="Processing your request, please wait..." />
      }

      <InnerHeader onPress={() => navigation.goBack()} title="Transaction History" />



      <View style={styles.info}>
      <Text style={styles.infoText}>View all transaction history</Text>
    </View>


      <View style={[styles.midBody, {justifyContent: (transactions.length == 0) ? 'center' : null}]}>

      {
        transactions.length == 0 &&
        <View style={styles.loanHistoryBody}>
            <Text style={styles.textHistory}>Your transaction history will show here</Text>
        </View>
      }

      {
        transactions.length > 0 &&
        transactions.map((item) => {
          return (
            <TransactionCarButton key={item.transaction_id}
              icon={icons.airtime}
              amount={Intl.NumberFormat('en-US').format(item.amount)}
              type={1}
              date={moment(item.date_created).format('DD-MMM-YYYY')}
              narration={item.narration}
            />

          )
       })
      }
  

      </View>
    

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  loanHistoryBody: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHistory: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.primaryRed
  },

  loanSummaryTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.sliderDescText,
    marginBottom: wp(3),
    marginLeft: wp(2)
  },
  midBody: {
    borderRadius: wp(8),
        marginHorizontal: wp(3),
        backgroundColor: COLORS.White,
        paddingBottom: wp(9),
        marginTop: wp(1),
        minHeight: wp(80),
        paddingTop: wp(4)
  },
  infoText: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3),
    color: COLORS.accountTypeDesc,
    textAlign: 'center',
    width: wp(50)
},
  info: {
    marginTop: wp(7),
    marginBottom: wp(1),
    marginLeft: wp(4)
  }
})

export default HistoryScreen;