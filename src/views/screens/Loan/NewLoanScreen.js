import React, { useEffect, useState } from 'react'
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
  Dimensions,
  ActivityIndicator} from 'react-native';
  import axios from 'axios';
  import { useSelector, useDispatch } from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import SelectDropdown from 'react-native-select-dropdown';
  import moment from 'moment';
  import { GreenCheckBox, RedCheckBox, BlueButton, SummaryLine, TenorCard, InnerHeader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import App from '../../../../App';


  const loadType = ["House Rent", "School Fees", "Borrowing", "Personal"];

const NewLoanScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const loanAmount = useSelector((state) => state.customer.approvedLoanAmount);
  const employerLoanProfile = useSelector((state) => state.customer.employerLoanProfile);
  const accountNumberID = useSelector((state) => state.customer.bankAccountID);
  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);

  const [defaultAmount, setDefaultAmount] = useState(20000)
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [requestAmount, setRequestAmount] = useState(defaultAmount)
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [tenor, setTenor] = useState(1);
  const [toggleBtn, setToggleBtn] = useState(0);
  const [loanSummaryDetails, setLoanSummaryDetails] = useState('data');

  const repaymentDate = moment().add(29, 'day').format('ll');

  const formatCurrencyText = (value) => {
    return value.toLocaleString('en-US', {maximumFractionDigits:2})
  }

  // function to toggle button
    const toggleSkipButton = () => {
  
      if(toggleBtn == 0) {
        setRequestAmount(loanAmount)
        setToggleBtn(1)
      }else if(toggleBtn == 1) {
        setRequestAmount(defaultAmount)
        setToggleBtn(0)
      }
      
  }
  // end of function

  // functiont to submit client loan request
  const calculateLoanSummary = (tenor) => {
    //data
   const data = {
    customerID : customerID,
    loanAmount: (requestAmount == 0) ? defaultAmount : requestAmount,
    loanTenor : tenor,
    loanInterest : employerLoanProfile.loan_INTEREST_RATE
  }

  console.log(data)

  setLoadingSummary(true);

    axios.post(APIBaseUrl.developmentUrl + 'loanService/CalculateSimpleInterestLoanSchedule',data,{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      setLoadingSummary(false)
    
          // SHOW SUCCESS
          console.log('Tenor: [' + tenor + "]");
          console.log('Monthly Repayment: [' + response.data.monthlyRepayment+ "]");
          console.log('Total Repayment: [' + response.data.totalLoanPayment + "]");
          setMonthlyRepayment(response.data.monthlyRepayment);
          setTotalRepayment(response.data.totalLoanPayment);
          setLoanSummaryDetails(response.data);
    
    })
    .catch(error => {
      console.log(error);
    });


  }
  // end of function

  //function to change tenor
  const changeLoanTenor = (tenor) => {
    calculateLoanSummary(tenor);
    setTenor(tenor)
  }//end of function

  //function to increase loan value
  const increaseLoanValue = (type) => {

    console.log(requestAmount + '/' + loanAmount)

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

  // function to continue process
  const validateLoanRequest = () => {

    if(loanPurpose == '') {
      Alert.alert(AppName.AppName, "Select loan purpose to proceed!")
      return;
    }

    if(accountNumberID == '') {
      Alert.alert(AppName.AppName, "Select disbursement account to proceed")
      return;
    }

    //set navigation
    navigation.navigate("ConfirmLoan", {loanAmt: requestAmount, loanSetTenor:tenor, 
                                       monthlyRepay:monthlyRepayment,
                                       totalRepay: totalRepayment,
                                       loanSetPurpose: loanPurpose, 
                                       repaySetDate: repaymentDate,
                                        interestRate: employerLoanProfile.loan_INTEREST_RATE});
  }
  // end of function

    //USE EFFECT
    useEffect(() => {

      calculateLoanSummary(tenor)

      //setToggleBtn(0)
      //set default amount
      //setRequestAmount(defaultAmount)
  
    }, [requestAmount]);


  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>
        <InnerHeader onPress={() => navigation.goBack()} 
          title="Apply for a Loan" />

        <View style={styles.midBody}>
            <Text style={styles.preTitle}>Your pre-approved amount</Text>

            <View style={styles.amountCounter}>
                <GreenCheckBox />
                <Text style={styles.textAprAmount}>{loanAmount.toLocaleString('en-US', {maximumFractionDigits:2})}</Text>
            </View>


            <View style={styles.loanArea}>
             <Text style={styles.loanTitle}>How much do you want to take?</Text>

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

             <Text style={styles.textAprAmount}>{formatCurrencyText(requestAmount)}</Text>

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

          <TouchableOpacity 
          onPress={() => toggleSkipButton()}
          style={styles.amountPrev}>
                <View style={(toggleBtn == 1) ? styles.checkBox_checked : styles.checkBox_notchecked}>
                <Image source={icons.check} 
                  style={{
                    height: (toggleBtn == 1) ? wp(5) : wp(4), 
                    width: (toggleBtn == 1) ? wp(4.5) : wp(4), 
                    resizeMode: 'contain', tintColor: COLORS.White
                  }}
                />
            </View>
                <Text style={styles.amtPrevTxt}>I will take my pre-approved amount</Text>
          </TouchableOpacity>
  
          <Text style={styles.tenorTitle}>How long do you want to take it for?</Text>

          <View style={styles.tenor}>
              <TenorCard onPress={() => changeLoanTenor(1)} active={(tenor == 1) ? true : null} title="1 Month" />
              <TenorCard onPress={() => changeLoanTenor(2)} active={(tenor == 2) ? true : null}  title="2 Months" />
              <TenorCard onPress={() => changeLoanTenor(3)} active={(tenor == 3) ? true : null} title="3 Months" />
              <TenorCard onPress={() => changeLoanTenor(6)} active={(tenor == 6) ? true : null} title="6 Months" />
          </View>
        </View>
        <View style={styles.loanOptions}>
              <Text style={styles.txtDisburse}>Disbursement Account</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddDisburseAccount")}
                style={styles.addOptionsBtn}
              >
              {(accountNumberID) &&
                  <Text style={styles.optionTxt}>See Account Details</Text>
              }

              {(!accountNumberID) &&
                <Text style={styles.optionTxt}>Add Account</Text>
             }


             
              </TouchableOpacity>
        </View>

        <View style={styles.loanOptions_second}>
        <Text style={styles.txtDisburse}>Loan Purpose</Text>


        <SelectDropdown 
        data={loadType}
        onSelect={(selectedItem, index) => {
          setLoanPurpose(selectedItem);
        }}
        defaultButtonText="Search here"
        dropdownStyle={{
          borderRadius: wp(3),
          
        }}
        rowTextStyle={{
          fontFamily: FONTS.POPPINS_REGULAR,
          fontSize: wp(3.2),
        }}
        buttonStyle={{
          backgroundColor: COLORS.White,
          borderRadius: wp(4),
          borderColor: '#a7c0eb',
          borderWidth: 1,
          borderStyle: 'solid',
          height: wp(6.3),
          width: wp(30)
          
        }}
        buttonTextStyle={{
          fontFamily: FONTS.POPPINS_REGULAR,
          fontSize: wp(2.7),
          textAlign: 'center',
          color: COLORS.ButtonBorderBlue
        }}
      />
{/**
   <TouchableOpacity
          style={styles.addOptionsBtn_second}
        >
            <Text style={styles.optionTxt}>Select here</Text>

        </TouchableOpacity>
*/}
    
  </View>
        </View>

     <View style={styles.loanSummary}>
      <Text style={styles.loanSummaryTxt}>Loan Summary</Text>


      {loadingSummary && 
        <View style={styles.loanSummaryLoader}>
             <ActivityIndicator color={COLORS.primaryRed} />
            <Text style={styles.loaderTxt}>Calculating Loan Summary, please wait...</Text>
        </View>
      }

            {!loadingSummary &&
              <View>
                  <SummaryLine title="Monthly Repayment" narration={"₦ " + Intl.NumberFormat('en-US').format(loanSummaryDetails.monthlyRepayment)} />
                  <SummaryLine title="First Repayment Date" narration={repaymentDate} />
                  <SummaryLine title="Total Repayment" narration={"₦ " + Intl.NumberFormat('en-US').format(loanSummaryDetails.totalLoanPayment)} />
                  <SummaryLine title="Loan Interest" narration={employerLoanProfile.loan_INTEREST_RATE + "%"} />
              </View>
          }
                <TouchableOpacity
                disabled={loadingSummary ? true : false}
                onPress={() => validateLoanRequest()}
                style={[styles.continueBtn,{backgroundColor: (loadingSummary) ? COLORS.disablePrimaryBlue : COLORS.primaryBlue}]}>
                    <Text style={styles.continueBtnTxt}>Continue</Text>
                    <Image source={icons.arrow_thick} 
                    style={{
                        height:wp(4), width: wp(4), marginLeft: wp(3), resizeMode: 'contain', tintColor: COLORS.White
                    }}/>
      </TouchableOpacity>


     </View>   
      </ScrollView>
  )
}

export default NewLoanScreen

const styles = StyleSheet.create({
  loanSummaryIndicator: {

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
    fontSize: wp(5.5),
    flex: 1,
    textAlign: 'center',
    marginLeft:wp(2)
  },
  amountCounter: {
    backgroundColor: COLORS.tabColorActive,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp(5),
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    width: wp(53),
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
    paddingVertical: Platform.OS === 'android' ? wp(3) : wp(4.3),
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