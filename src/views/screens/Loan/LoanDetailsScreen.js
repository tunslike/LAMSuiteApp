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
  import { BreakdownEntry, LoaderWindow, InnerHeader, PaymentScheduleCard, RepaymentCard } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const LoanDetailsScreen = ({route, navigation}) => {

  const {loadID} = route.params;

  // CUSTOMER STORE
  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);
  const accountNumberID = useSelector((state) => state.customer.bankAccountID);
  const loanData = useSelector((state) => state.customer.loanData);
  const employerLoanProfile = useSelector((state) => state.customer.employerLoanProfile);
  const customerEmployerDetails = useSelector((state) => state.customer.customerEmployerDetails);

  // STATES
  const [isLoading, setIsLoading] = useState(false)
  const [toggle, setToggle] = useState(1);
  const [loanBreakdown, setLoanBreakdown] = useState([]);
  const [loanRepayment, setLoanRepayment] = useState([]);
  const [loanDetails, setLoanDetails] = useState('');

  const toggleButton = (value) => {

    if(value == 1) {

      loadLoanSummary();
      setToggle(value)

    }else{

      fetchLoanSummary();
      setToggle(value)

    }
   
  }


  // functiont to submit client loan request
  const loadLoanSummary = () => {

  //data
  const data = {
    customerID : customerID,
    loanAmount : loanData.loan_AMOUNT,
    loanTenor : loanData.loan_TENOR,
    loanInterest : loanData.interest_RATE,
    annualSalary :  customerEmployerDetails.annual_SALARY,
    loanPercentLimited : employerLoanProfile.loan_LIMIT_PERCENT
  }

  setIsLoading(true);

    axios.post(APIBaseUrl.developmentUrl + 'loanService/CalculateSimpleInterestLoanSchedule',data,{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      setIsLoading(false)
      
      //console.log(response.data.totalLoanPayment)
      setLoanDetails(response.data)
      setLoanBreakdown(response.data.repaymentSchedule)

    })
    .catch(error => {
      console.log(error);
    });
  }
  // end of function


    // functiont to submit client loan request
    const fetchLoanSummary = () => {

      //data
    const data = {
      loanID : loadID,
    }

  console.log(loadID);

    setIsLoading(true);

      axios.post(APIBaseUrl.developmentUrl + 'loanService/fetchCustomerLoanDetails',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {

        setIsLoading(false)

        console.log(response.data.repayment)
        
        setLoanRepayment(response.data.repayment);

      })
      .catch(error => {
        console.log(error);
      });
    }
    // end of function


      //USE EFFECT
  useEffect(() => {

    loadLoanSummary();

  }, []);


  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>

      <LoaderWindow loading={isLoading} />

      <InnerHeader onPress={() => navigation.goBack()} title="Loan Details" />

      <View style={styles.toggleBox}>
      <TouchableOpacity onPress={() => toggleButton(1)} style={(toggle == 1) ? styles.toggleBtn_active : styles.toggleBtn}>
          <Text style={(toggle == 1) ? styles.toggleTxt_active : styles.toggleTxt}>Payment Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  toggleButton(0)} style={(toggle == 0) ? styles.toggleBtn_active : styles.toggleBtn}>
          <Text style={(toggle == 0) ? styles.toggleTxt_active : styles.toggleTxt}>Repayment</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.midBodySummary}>
    <Text style={styles.loanSummaryTxt}>Loan Summary</Text>


      <View style={styles.sumRow}>
          <View>
            <Text style={styles.hdr}>Loan Amount</Text>
            <Text style={styles.desc}>N {Intl.NumberFormat('en-US').format(loanDetails.loanAmount)}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.hdr}>Loan Tenor</Text>
            <Text style={styles.desc}>{loanDetails.loanTenor} Months</Text>
          </View>
      </View>
      <View style={styles.sumRow}>
      <View>
        <Text style={styles.hdr}>Monthly Repayment</Text>
        <Text style={styles.desc}>N {Intl.NumberFormat('en-US').format(loanDetails.monthlyRepayment)}</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.hdr}>Total Repayment</Text>
        <Text style={styles.desc}>N {Intl.NumberFormat('en-US').format(loanDetails.totalLoanPayment)}</Text>
      </View>
      </View>
      <View style={styles.sumRow}>
      <View>
        <Text style={styles.hdr}>Interest Rate</Text>
        <Text style={styles.desc}>{loanDetails.loanRate}%</Text>
      </View>
      <View>
      <Text style={styles.hdr}>Status</Text>
      <Text style={styles.desc}>{(loanDetails.loan_STATUS == 3) ? "Running" : "Running"}</Text>
    </View>
      </View>

    </View>

    {toggle == 1 && 
      <View style={styles.midBody}>
      <Text style={styles.loanSummaryTxt}>Payment Schedule</Text>

      {(loanBreakdown && loanBreakdown.length > 0) &&
        loanBreakdown.map((item) => {
          return (
            <PaymentScheduleCard key={item.PaymentMonth}
                month={item.PaymentMonth}
                principal={item.principalPaid}
                interest={item.InterestPaid}
                balance={item.newBalance}
            />
          )
        })
      }
      </View>
    }
  
    {toggle == 0 &&
        <View style={styles.midBody}>
        <Text style={styles.loanSummaryTxt}>Loan Repayment</Text>


        {(loanRepayment.length == 0) &&

          <View style={styles.nodatabox}>
            <Text style={styles.nodataTxt}>No repayment has been made!</Text>
          </View>
        }
    
        {(loanRepayment && loanRepayment.length > 0) &&
          loanRepayment.map((item) => {
            return (
             <RepaymentCard key={item.repayment_id}
                narration={item.narration}
                date={moment(item.payment_date).format('DD-MMM-YYYY')}
                channel={item.payment_channel}
                amount={item.repayment_amount}
             />
            )
          })
        }
      </View>
    }

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  nodatabox: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  nodataTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.primaryRed
  },
  loanSummaryTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.3),
    color: '#160B53',
    marginBottom: wp(3),
    marginLeft: wp(2)
  },

  desc: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.primaryRed,
    fontSize: wp(3),
    marginTop: wp(0.3)
  },
  hdr: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3),
    color: COLORS.accountTypeDesc
  },

  sumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:wp(3)
  },
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
  dataBody: {
    marginHorizontal: wp(8),
    marginTop: wp(7)
  },

  headerTitle: {
    marginTop: wp(6),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.TextColorGrey,
    fontSize: wp(3),
    marginLeft: wp(9)
  },
  
  toggleBox: {
    marginHorizontal: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: wp(8)
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
        marginHorizontal: wp(4),
        backgroundColor: COLORS.White,
        paddingBottom: wp(9),
        marginTop: wp(6),
        minHeight: wp(90),
        padding: wp(4)
      },
      midBodySummary: {
        borderRadius: wp(5),
        marginHorizontal: wp(4),
        backgroundColor: COLORS.White,
        marginTop: wp(6),
        padding: wp(4),
        paddingBottom: wp(1)
      },
    infoText: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(3.2),
        color: COLORS.accountTypeDesc,
        textAlign: 'center',
        width: wp(50)
    },
    info: {
        marginVertical: wp(4),
        alignItems:'center'
    }
})

export default LoanDetailsScreen