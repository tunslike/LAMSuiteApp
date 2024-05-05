import React, { useState, useEffect } from 'react'
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
  import { useIsFocused } from "@react-navigation/native";
  import { useSelector, useDispatch } from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import {LoanPaymentTypeCard, Loader, InnerHeader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const LoanRepaymentScreen = ({navigation}) => {

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  // CUSTOMER STORE
  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);
  const loanData = useSelector((state) => state.customer.loanData);
  const accountNumberID = useSelector((state) => state.customer.bankAccountID);
  const loanAmount = useSelector((state) => state.customer.approvedLoanAmount);


  // STATES
  const [isLoading, setIsLoading] = useState(false)

  const [defaultAmount, setDefaultAmount] = useState(20000)
  const [requestAmount, setRequestAmount] = useState(0)
  const [partPayment, setPartPayment] = useState(0)
  const [updatedLoanData, setUpdatedLoanData] = useState('');
  const [loanBalance, setLoanBalance] = useState(0);
  const [toggle, setToggle] = useState(1);

  
  const formatCurrencyText = (value) => {
    return value;
  }

  const toggleButton = (value) => {

    if(value == '0') {
      setRequestAmount(loanBalance)
    }else if(value == '1') {
      setRequestAmount(partPayment)
    }

    setToggle(value)
  }

   //function to increase loan value
   const increaseLoanValue = (type) => {

    let newAmount = defaultAmount;

      if(type == 1){

          if(requestAmount > defaultAmount) {

            newAmount = requestAmount - 5000;
            setRequestAmount(newAmount);
          }

      }else if(type == 2) {

          if(requestAmount < loanAmount) {

            newAmount = requestAmount + 5000;

            if(newAmount < loanAmount) {
              setRequestAmount(newAmount);
            } 
          }
      }
  }
  //end of function

    // function to verify data
    const validateCustomerLoan = () => {

      //data
      const data = {
        "customerID" : customerID,
      }
  
      setIsLoading(true);
  
        axios.post(APIBaseUrl.developmentUrl + 'loanService/confirmCustomerLoan',data,{
          headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8082'
          }
        })
        .then(response => {
  
          setIsLoading(false)
  
          console.log(response.data)
          setUpdatedLoanData(response.data)
          setLoanBalance(response.data.total_REPAYMENT - response.data.loan_TOTAL_REPAYMENT);

          setPartPayment(response.data.monthly_REPAYMENT)
          console.log(partPayment)
          setRequestAmount(partPayment)


        })
        .catch(error => {
          console.log(error);
        });
  
    }// end of function 

      //USE EFFECT
  useEffect(() => {

    console.log(isFocused)

    validateCustomerLoan();

  }, []);


  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>

      {isLoading &&
        <Loader title="Processing your request, please wait..." />
      }

      <InnerHeader onPress={() => navigation.goBack()} title="Loan Repayment" />

      <View style={styles.midBody}>
      <Text style={styles.preTitle}>Your outstanding loan balance</Text>
    
      <View style={styles.amountCounter}>
          <Text style={styles.textAprAmount}>₦{loanBalance.toLocaleString('en-US', {maximumFractionDigits:2})}</Text>
      </View>

      <View style={styles.loanArea}>

  

      <View style={styles.toggleBox}>
      <TouchableOpacity onPress={() => toggleButton(1)} style={(toggle == 1) ? styles.toggleBtn_active : styles.toggleBtn}>
          <Text style={(toggle == 1) ? styles.toggleTxt_active : styles.toggleTxt}>Part Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  toggleButton(0)} style={(toggle == 0) ? styles.toggleBtn_active : styles.toggleBtn}>
          <Text style={(toggle == 0) ? styles.toggleTxt_active : styles.toggleTxt}>Full Payment</Text>
      </TouchableOpacity>
    </View>

      <Text style={styles.loanTitle}>How much do you want to pay?</Text>

      <View style={styles.amountLoanCounter}>
     
      <TouchableOpacity 
       onPress={() => increaseLoanValue(1)}
      style={styles.btnBG}>
         <Image source={icons.minus} 
         style={{
           height: wp(4), width: wp(4), resizeMode: 'contain', tintColor: COLORS.primaryBlue
         }}
         />
      </TouchableOpacity>

      <Text style={styles.textAprAmount}>{requestAmount.toLocaleString('en-US', {maximumFractionDigits:2})}</Text>

       <TouchableOpacity 
       onPress={() => increaseLoanValue(2)}
       style={styles.btnBG}>
       <Image source={icons.add} 
       style={{
         height: wp(4), width: wp(4), resizeMode: 'contain', tintColor: COLORS.primaryBlue
       }}
       />
     </TouchableOpacity>
   </View>

   </View>

   <Text style={styles.paymentTitle}>How do you want to pay?</Text>

   <LoanPaymentTypeCard 
   onPress={() => navigation.navigate("BankTransfer",{payment_amount:requestAmount})}
   icon={icons.bank_transfer}
   channelName="Bank Transfer"
/>
   <LoanPaymentTypeCard 
       icon={icons.account_icon}
       channelName="Online Card Payment"
   />

   <LoanPaymentTypeCard 
      icon={icons.phone_transfer}
      channelName="USSD Transfer payment"
   />


   </View>

    

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  toggleTxt_active: {
    color: COLORS.White,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3)
  },

  toggleTxt: {
    color: COLORS.primaryRed,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3)
  },
  toggleBtn_active: {
      paddingVertical: wp(2.8),
      width: wp(40),
      borderRadius: wp(2),
      backgroundColor: COLORS.primaryRed,
      alignItems: 'center'
  },
  toggleBtn: {
    paddingVertical: wp(2.5),
    width: wp(40),
    borderRadius: wp(2),
    borderColor: COLORS.primaryRed,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center'
},
    
  toggleBox: {
    marginHorizontal: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: wp(5),
    marginBottom: wp(5)
  },
  loaderTxt: {
    color: COLORS.primaryRed,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    alignSelf: 'center',
    marginTop: wp(4)
  },
  loanSummaryLoader: {
    marginHorizontal: wp(3),
    paddingVertical: wp(4)
  },
  continueBtnTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    color: COLORS.White,
  },
  continueBtn: {
    marginTop: wp(5),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(25),
    paddingVertical: wp(3.5),
    borderRadius: wp(4),
    marginBottom: wp(3),
  },
  checkBox_checked: {
    backgroundColor: COLORS.primaryRed,
    borderRadius: wp(1.5),
    marginLeft: wp(1.5)
  },
  checkBox_notchecked: {
    borderColor: COLORS.TextBoxBorderGrey,
    borderRadius: wp(1.5),
    borderWidth: 1,
    borderStyle: 'solid',
  },
  amtPrevTxt: {
    color: COLORS.TextColorGrey,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    marginTop: wp(0.3)
  },
  amountPrev: {
     marginTop: wp(3),
     alignSelf: 'center',
     flexDirection: 'row',
     justifyContent: 'flex-start',
     columnGap: wp(2)
  },
  signInBox: {
    alignSelf: 'center',
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: wp(31.3),
    paddingVertical: Platform.OS === 'ios' ? wp(3.9) : wp(3.2),
    borderRadius: wp(4),
    marginBottom: wp(3)
  },
  loanSummaryTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    color: '#160B53',
    marginBottom: wp(3)
  },
  loanSummary: {
    backgroundColor: COLORS.White,
    marginTop: wp(3),
    borderTopRightRadius: wp(8),
    borderTopLeftRadius: wp(8),
    padding: wp(4.4),
    paddingBottom: wp(8),
    marginHorizontal: wp(2)
  },
  txtDisburse: {
      color: COLORS.accountTypeDesc,
      fontFamily: FONTS.POPPINS_MEDIUM,
      fontSize: wp(3.2)
  },
  optionTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.6),
    color: COLORS.ButtonBorderBlue
  },
  addOptionsBtn: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    columnGap: wp(2),
    borderRadius: wp(4),
    borderColor: '#a7c0eb',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1)
  },

  addOptionsBtn_second: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    columnGap: wp(2),
    borderRadius: wp(4),
    borderColor: '#a7c0eb',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: wp(4),
    paddingVertical: wp(1)
  },
  loanOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp(4),
    marginHorizontal: wp(4)
  },
  loanOptions_second: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp(3),
    marginHorizontal: wp(4)
  },
  tenor: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: wp(3),
    marginTop: wp(4),
    marginBottom: wp(1)
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
    fontSize: wp(5),
    flex: 1,
    textAlign: 'center',
  },
  amountCounter: {
    backgroundColor: COLORS.tabColorActive,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp(5),
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    width: wp(50),
    alignSelf: 'center',
    marginTop: wp(3)
  },
  amountLoanCounter: {
    borderColor: COLORS.companySetupBorder,
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp(5),
    paddingVertical: wp(3),
    paddingHorizontal: wp(3),
    width: wp(60),
    alignSelf: 'center',
    marginTop: wp(3)
  },
  loanTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.2),
    color: COLORS.primaryBlue,
    alignSelf: 'center',
    marginTop: wp(3)
  },

  paymentTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.2),
    color: COLORS.accountTypeDesc,
    marginTop: wp(8),
    alignSelf: 'center',
    marginBottom: wp(5)
  },

  tenorTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.2),
    color: COLORS.accountTypeDesc,
    alignSelf: 'center',
    marginTop: wp(6)
  },
  preTitle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.primaryRed,
    alignSelf: 'center',
    marginTop: wp(4)
  },
  midBody: {
    borderRadius: wp(8),
    marginHorizontal: wp(2),
    backgroundColor: COLORS.White,
    marginTop: wp(2.5),
    paddingBottom: wp(4)
  }
})

export default LoanRepaymentScreen;