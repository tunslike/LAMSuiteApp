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

const LoanConfirmationScreen = ({route, navigation}) => {

  // CUSTOMER STORE
  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);
  const accountNumberID = useSelector((state) => state.customer.bankAccountID);
  const accountBankDetails = useSelector((state) => state.customer.bankAccountDetails);


  // ROUTE VALUE
  const {loanAmt, monthlyRepay, totalRepay, loanSetTenor, loanSetPurpose, repaySetDate, interestRate} = route.params;

  // STATES
  const [isLoading, setIsLoading] = useState(false)
  const [toggleBtn, setToggleBtn] = useState(0);
  const [activateButton, setActivateButton] = useState(true);

  const formatCurrencyText = (value) => {
    return value.toLocaleString('en-US', {maximumFractionDigits:2})
  }

  // function to toggle button
  const toggleSkipButton = () => {
    if(toggleBtn == 0) {
      setActivateButton(false)
      setToggleBtn(1)
    }else if(toggleBtn == 1) {
      setActivateButton(true)
      setToggleBtn(0)
    }
}
// end of function

    //validate account number
    const validCustomerLoanRequest = () => {
      
      Alert.alert(AppName.AppName, 'Do you want to submit your loan request?', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => submitCustomerLoanRequest()},
      ]);
  
    }// end function

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

      <InnerHeader onPress={() => navigation.goBack()} title="Loan Confirmation" />

      <View style={styles.info}>
        <Text style={styles.infoText}>You are almost done! Please confirm your loan details</Text>
      </View>

      <View style={styles.midBody}>
      <Text style={styles.preTitle}>Your pre-approved amount</Text>

      <View style={styles.amountCounter}>
          <GreenCheckBox />
          <Text style={styles.textAprAmount}>{formatCurrencyText(loanAmt)}</Text>
      </View>

{/**
      <TouchableOpacity style={styles.offerLetter}>
            <Image source={icons.sign} 
                style={{
                    height: wp(4), width: wp(4), resizeMode: 'contain', tintColor: COLORS.primaryRed
                }}
            />
            <Text style={styles.txtOffer}>View Offer Letter</Text>
      </TouchableOpacity>
*/}

      <View style={styles.loanBreakdown}>
      
            <BreakdownEntry header1="Monthly Repayment" header2="Loan Tenor" desc1={"₦ " + Intl.NumberFormat('en-US').format(monthlyRepay)} desc2={loanSetTenor + " Months"} />
            <BreakdownEntry header1="Total Repayment" header2="Interest Rate" desc1={"₦ " + Intl.NumberFormat('en-US').format(totalRepay)} desc2={interestRate + "%"} />
            <BreakdownEntry header1="First Repayment Date" desc1={repaySetDate} />
      </View>

      <View style={styles.secondSummary}>
      <View style={{marginHorizontal: wp(7)}}>
      <BreakdownEntry 
            header1="Disbursement Account" 
            header2="Loan Purpose" 
            desc1={accountBankDetails}
            desc2={loanSetPurpose} 
            descStyle={{
                color: COLORS.ButtonBorderBlue
            }}/>
            <View>
            <TouchableOpacity 
            onPress={() => toggleSkipButton()}
            style={styles.amountPrev}>
              <View style={(toggleBtn == 1) ? styles.checkBox_checked : styles.checkBox_notchecked}>
                  <Image source={icons.check} 
                    style={{
                      height: (toggleBtn == 1) ? wp(4.5) : wp(4), width: (toggleBtn == 1) ? wp(4.5) : wp(4), resizeMode: 'contain', tintColor: COLORS.White
                    }}
                  />
              </View>
                  <View>
                  <Text style={styles.amtPrevTxt}>Your loan facility is powered by finserve loan scheme, and thereby you are agreeing to the terms of the loan</Text>
                  </View>
            </TouchableOpacity>

    
            </View>
      </View>

      </View>
      </View>

      <TouchableOpacity
            disabled={activateButton}
            onPress={() => validCustomerLoanRequest()}
            style={[styles.continueBtn,{backgroundColor: (activateButton) ? COLORS.disablePrimaryBlue : COLORS.primaryBlue}]}>
                <Text style={styles.continueBtnTxt}>I am ready to receive the cash</Text>
                <Image source={icons.arrow_thick} 
                style={{
                    height:wp(4), width: wp(4), marginLeft: wp(3), resizeMode: 'contain', tintColor: COLORS.White
                }}/>
  </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  amountPrev: {
    marginTop: wp(3),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: wp(2),
    marginLeft: wp(1)
 },
  checkBox_checked: {
    backgroundColor: COLORS.primaryRed,
    borderRadius: wp(1.5),
    marginLeft: wp(1.5),
    height: wp(4.5),
    marginLeft: wp(-1)
  },
  checkBox_notchecked: {
    borderColor: COLORS.TextBoxBorderGrey,
    borderRadius: wp(1.5),
    borderWidth: 1,
    borderStyle: 'solid',
    height: wp(4.5),
    marginTop: wp(0.4)
  },
  amtPrevTxt: {
    color: COLORS.TextColorGrey,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
  },
    offerLetter: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: wp(3),
        columnGap: wp(1)
    },
    txtOffer: {
     fontFamily: FONTS.POPPINS_MEDIUM,
     color: COLORS.primaryRed,
     fontSize: wp(3),
    },
    continueBtnTxt: {
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3),
        color: COLORS.White,
      },
      continueBtn: {
        marginTop: wp(5),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: wp(9),
        paddingVertical: wp(3.5),
        borderRadius: wp(4),
        marginBottom: wp(3),
      },
    secondSummary: {
        borderTopColor: COLORS.BackgroundGrey,
        borderTopWidth: 1,
        borderStyle: 'solid',
        paddingTop: wp(6)
    },
    loanBreakdown: {
        marginTop: wp(7),
        marginHorizontal: wp(3),
        paddingHorizontal: wp(4)
    },
    btnBG: {
        backgroundColor: COLORS.notificationBG,
        padding: wp(2),
        borderRadius: wp(2.8)
      },
      loanArea: {
          borderTopColor: COLORS.BackgroundGrey,
          borderTopWidth: 1,
          borderBottomColor: COLORS.BackgroundGrey,
          borderBottomWidth: 1,
          borderStyle: 'solid',
          paddingBottom: wp(4),
          paddingTop: wp(1),
          marginTop: wp(6)
      },
      textAprAmount: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.textLoanAmount,
        fontSize: wp(6.5),
        flex: 1,
        textAlign: 'center',
      },
    amountCounter: {
        backgroundColor: COLORS.tabColorActive,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: wp(5),
        paddingVertical: wp(3.5),
        paddingHorizontal: wp(5),
        width: wp(55),
        alignSelf: 'center',
        marginTop: wp(5)
      },
    preTitle: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3),
        color: COLORS.primaryRed,
        alignSelf: 'center',
        marginTop: wp(4),
      },
    midBody: {
        borderRadius: wp(8),
        marginHorizontal: wp(3.2),
        backgroundColor: COLORS.White,
        paddingBottom: Platform.OS === 'android' ? wp(5) : wp(9),
      },
    infoText: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(3),
        color: COLORS.accountTypeDesc,
        textAlign: 'center',
        width: wp(50)
    },
    info: {
        marginVertical: wp(4),
        alignItems:'center'
    }
})

export default LoanConfirmationScreen