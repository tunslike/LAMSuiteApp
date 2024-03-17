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
  import { LoanHistoryCard, Loader, InnerHeader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const LoansScreen = ({navigation}) => {

  // CUSTOMER STORE
  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);
  const loanData = useSelector((state) => state.customer.loanData);
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

      <InnerHeader onPress={() => navigation.goBack()} title="Manage Loan" />


      <View style={styles.midBodyNoPadding}>
      <Text style={styles.hdrTxt}>Review your loan profile</Text>
      <View style={styles.creditScore}>
      <Image source={icons.thumbdown} 
        style={{
          height: wp(3.5), width: wp(3.5), resizeMode: 'contain', tintColor: COLORS.primaryRed
        }}
      />
        <Text style={styles.creditTxt}>Your loan credit score is 40/120</Text>
      </View>
      </View>

<Text style={styles.headerTitle}>Active Loan</Text>

      {(loanData.loan_STATUS == 1) &&
    
          <View style={styles.midBody}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoanDetails", {loadID: loanData.loan_ID})}
          >
                <View style={styles.statusRow}>
                      <View style={styles.activeBox}>
                        <Text style={styles.preTitle}>APPROVED</Text>
                      </View>
                      <Text style={styles.runningStatus}>{moment(loanData.authorise_DISBURSE_DATE).format('DD-MMM-YYYY')}</Text>
                </View>
                <Text style={styles.loanPurpose}>{loanData.loan_PURPOSE}</Text>
                <Text style={styles.loanAmt}>₦ {Intl.NumberFormat('en-US').format(loanData.loan_AMOUNT)}</Text>
                <Text style={styles.loanDesc}>Your loan request has been approved and disbursed</Text>
          </TouchableOpacity>
        </View>
      }


      <Text style={styles.headerTitle}>Loan History</Text>
      <LoanHistoryCard 
        onPress={() => navigation.navigate("LoanDetails")}
        loanPurpose="House Rent"
        loanAmount="N57,000"
        status="Outstanding Payment"
        date="September 12th, 2023"
      />
      <LoanHistoryCard 
        onPress={() => navigation.navigate("LoanDetails")}
        loanPurpose="Education"
        loanAmount="N150,000"
        status="Completed"
        date="December 23th, 2023"
      />
      <LoanHistoryCard 
        onPress={() => navigation.navigate("LoanDetails")}
        loanPurpose="Personal"
        loanAmount="N80,000"
        status="Completed"
        date="November 03rd, 2023"
      />
    

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  creditTxt: {
    color: COLORS.primaryRed,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.2),
    marginLeft: wp(2)
  },
  creditScore: {
    borderTopColor: COLORS.BackgroundGrey,
    borderTopWidth: 1,
    borderStyle: 'solid',
    paddingTop: wp(3),
    paddingBottom: wp(2),
    paddingLeft: wp(7),
    marginTop: wp(3),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
},
  hdrTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3),
    color: COLORS.accountTypeDesc,
    marginLeft: wp(6),
  },
  headerTitle: {
    marginTop: wp(6),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.TextColorGrey,
    fontSize: wp(3),
    marginLeft: wp(9)
  },
  runningStatus: {
    color: COLORS.sliderDescText,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    marginRight: wp(2)
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(1)
  },
  loanDesc: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.sliderDescText,
    marginTop: wp(2),
    marginLeft: wp(3.2)
},
  loanAmt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4.5),
    color: COLORS.primaryRed,
    marginTop: wp(1),
    marginLeft: wp(3.2)
},
  loanPurpose: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(4),
    color: COLORS.textLoanAmount,
    marginTop: wp(2.5),
    marginLeft: wp(3.2)
},
  activeBox: {
    borderColor: COLORS.successGreen,
      borderWidth: 1,
      borderStyle: 'solid',
      padding: wp(0.6),
      borderRadius: wp(5),
      width:'25%',
      alignItems: 'center',
      marginLeft: wp(2)
  },
  preTitle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.successGreen,
  },
  midBody: {
    borderRadius: wp(8),
    marginHorizontal: wp(2),
    backgroundColor: COLORS.White,
    marginTop: wp(1.5),
    paddingBottom: wp(4),
    padding: wp(3)
  },
  midBodyNoPadding: {
    borderRadius: wp(8),
    marginHorizontal: wp(2),
    backgroundColor: COLORS.White,
    marginTop: wp(5),
    paddingBottom: wp(2),
    paddingTop: wp(4)
  }
})

export default LoansScreen;