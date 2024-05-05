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
  import moment from 'moment';
  import { useSelector, useDispatch } from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { LoanHistoryCard, Loader, InnerHeader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { useFocusEffect } from '@react-navigation/native';

const LoansScreen = ({navigation}) => {

  // CUSTOMER STORE
  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);
  const accountNumberID = useSelector((state) => state.customer.bankAccountID);

  // STATES
  const [isLoading, setIsLoading] = useState(false)
  const [loanDetails, setLoanDetails] = useState('');

    // functiont to submit client loan request
    const fetchCustomerLoanDetails = () => {

      //data
    const data = {
      customerID : customerID
  }

    console.log(data);

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
        
        setLoanDetails(response.data)
        

      })
      .catch(error => {
        console.log(error);
      });
    }
    // end of function


    useFocusEffect(
      React.useCallback(() => {
        fetchCustomerLoanDetails();
      }, [])
    );
    


      //USE EFFECT
  useEffect(() => {


  }, []);



  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>

      {isLoading &&
        <Loader title="Processing your request, please wait..." />
      }

      <InnerHeader onPress={() => navigation.goBack()} title="Manage Loan" />


      {loanDetails.credit_SCORE && 
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
      }
   

<Text style={styles.headerTitle}>Active Loan</Text>

      {loanDetails.loan_ID &&
    
          <View style={styles.midBody}>
          <TouchableOpacity
            onPress={() => (loanDetails.loan_STATUS == 3) ? navigation.navigate("LoanDetails", {loadID: loanDetails.loan_ID}) : null}
          >
                <View style={styles.statusRow}>

                {
                  (loanDetails.loan_STATUS == 3) &&
                  <View style={styles.activeBox}>
                     <Text style={styles.preTitle}>AUTHORISED</Text>
                  </View>
                }
                {
                  (loanDetails.loan_STATUS != 3) &&
                    <View style={[styles.activeBox_pending]}>
                      <Text style={styles.preTitle_pending}>PENDING REVIEW</Text>
                    </View>
                }

                      <Text style={styles.runningStatus}>{moment(loanDetails.authorise_DISBURSE_DATE).format('DD-MMM-YYYY')}</Text>
                </View>
                <Text style={styles.loanPurpose}>{loanDetails.loan_PURPOSE}</Text>
                <Text style={styles.loanAmt}>₦ {Intl.NumberFormat('en-US').format(loanDetails.loan_AMOUNT)}</Text>
                {loanDetails.loan_STATUS == 3 &&
                  <Text style={styles.loanDesc}>Your loan request has been approved and disbursed</Text>
                }

                {loanDetails.loan_STATUS != 3 &&
                  <Text style={styles.loanDesc}>Your loan request has been approved and is being reviewed</Text>
                }
          </TouchableOpacity>
        </View>
      }

      {
        !loanDetails.loan_ID &&
        <View style={styles.loanHistoryBody}>
          <Text style={styles.textHistory}>You do not have an active loan!</Text>
        </View>
      }

      <Text style={styles.headerTitle}>Loan History</Text>


      {!loanDetails.loan_HISTORY &&
          <View style={styles.loanHistoryBody}>
            <Text style={styles.textHistory}>Your loan history will show here</Text>
          </View>
      }

      {loanDetails.loan_HISTORY && 

        <View>
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
        </View>
      
      }    

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

textHistory: {
  fontFamily: FONTS.POPPINS_REGULAR,
  fontSize: wp(3),
  color: COLORS.primaryRed
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
      paddingVertical: wp(0.6),
      paddingHorizontal: wp(1.5),
      borderRadius: wp(5),
      width:'30%',
      alignItems: 'center',
      marginLeft: wp(2)
  },

  activeBox_pending: {
    borderColor: COLORS.accountNumberColor,
      borderWidth: 1,
      borderStyle: 'solid',
      padding: wp(0.6),
      borderRadius: wp(5),
      width:'35%',
      alignItems: 'center',
      marginLeft: wp(2)
  },
  
  preTitle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.successGreen,
  },

  preTitle_pending: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.accountNumberColor,
  },
  loanHistoryBody: {
    borderRadius: wp(8),
    marginHorizontal: wp(2),
    backgroundColor: COLORS.White,
    marginTop: wp(1.5),
    paddingBottom: wp(4),
    padding: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: wp(35)
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