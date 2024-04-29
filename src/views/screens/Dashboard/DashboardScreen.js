import React, { useContext, useState, useEffect } from 'react'
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
  import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
  import { AccountCard, AccountCardNoLoan, ServiceCard, GreenCheckBox, TransactionCard, Loader, CreditRating, KYCStatusCard } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import moment from 'moment';
  import { useSelector, useDispatch } from 'react-redux';
  import { updateApprovedloanAmount } from '../../../store/customerSlice';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { useFocusEffect } from '@react-navigation/native';

const DashboardScreen = ({navigation}) => {

  // store 
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.customerData);
  const loanData = useSelector((state) => state.customer.loanData);

  const biodata = useSelector((state) => state.customer.biodata);
  const empdata = useSelector((state) => state.customer.empdata);
  const nokdata = useSelector((state) => state.customer.nokdata);

  const customerEmployerDetails = useSelector((state) => state.customer.customerEmployerDetails);
  const employerLoanProfile = useSelector((state) => state.customer.employerLoanProfile);

  // context
  const {customerFullname} = useContext(AuthContext);

  //states
  const [greetings, setGreetings] = useState('');
  const [approvedLoan, setApprovedLoan] = useState(false);
  const [loanAccount, setLoanAccount] = useState('');
  const [loanAmount, setLoanAmount] = useState(0);
  const [KYStatus, setKYCStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState('');

  // check if pre-approved amount is there
  const checkPreApprovedAmount = () => {

    if(customerEmployerDetails != null && employerLoanProfile != null) {

      let annualSal = customerEmployerDetails.annual_SALARY;
      let interest = employerLoanProfile.loan_LIMIT_PERCENT;
      let apprvLoan = (annualSal / interest);

      dispatch(updateApprovedloanAmount(apprvLoan))
      setLoanAmount(apprvLoan.toLocaleString('en-US', {maximumFractionDigits:2}));

      setApprovedLoan(true);
    }
  }
  // end of function

   // function to verify data
   const fetchTransactionDetails = () => {

      axios.get(APIBaseUrl.developmentUrl + 'customer/fetchTransaction?CustomerID=' +customerData.customer_ENTRY_ID,{},{
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

  // function to verify data
  const validateCustomerLoan = () => {

    //data
    const data = {
      "customerID" : customerData.customer_ENTRY_ID,
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

        setLoanAccount(response.data)

      })
      .catch(error => {
        console.log(error + "1");
      });

  }// end of function 

  // return customer first name
  const cleanCustomerFullname = (customerFullname) => {
    const names = customerFullname.split(" ");
    return names[0];
  }

   //return greetings
   checkTimeGreetings = () => {

    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      setGreetings('Good Morning')
    } else if (curHr < 18) {
      setGreetings('Good Afternoon')
    } else {
      setGreetings('Good Evening')
    }
}

useFocusEffect(
  React.useCallback(() => {
    validateCustomerLoan();
   // fetchTransactionDetails();
  }, [])
);

  //USE EFFECT
  useEffect(() => {

    if(biodata == 1 && nokdata == 1 && empdata == 1) {
      setKYCStatus(true);
    }

    //check preapproved amount
    checkPreApprovedAmount();

    //return greetings
    this.checkTimeGreetings();

  }, []);

  return (
    <ScrollView style={{
      flexGrow: 1,
      backgroundColor: COLORS.BackgroundGrey
    }}>

    {isLoading &&
      <Loader />
    }

    <View style={styles.header}>
          <View style={styles.logoArea}>
                <Image source={images.appLogo} 
                  style={{
                    height: wp(13), width: wp(13), borderRadius: wp(4), resizeMode: 'contain'
                  }}
                />
                <View>
                    <Text style={styles.titleHeader}>Hello, {cleanCustomerFullname(customerFullname)}</Text>
                    <Text style={styles.titleGreeting}>{greetings}</Text>
                </View>
          </View>
          <View style={styles.tabAreas}>
               <CreditRating rating={1} />
                <TouchableOpacity 
                  onPress={() => navigation.navigate("NotificationScreen")}
                style={styles.bellBG}>
                    <Image source={icons.notification} 
                      style={{
                        height: wp(4.5), width: wp(4.5), resizeMode: 'contain', tintColor: COLORS.primaryBlue
                      }}
                    />
                </TouchableOpacity>
          </View>
    </View>

        <View style={styles.dashboardArea}>

        {
          !KYStatus &&
          <KYCStatusCard 
          onPress={() => navigation.navigate("KYCStatus")}
          icon={icons.profile} 
          status="Pending" 
      />
        }
   

        {(loanAccount.loan_STATUS != 3) &&
          <AccountCardNoLoan />
        }

        {(loanAccount.loan_STATUS == 3) &&
          <AccountCard 
            loanNumber = {loanAccount.loan_NUMBER}
            loanBalance = {loanAccount.loan_AMOUNT}
            nextPayment = {loanAccount.monthly_REPAYMENT}
            employer = {loanAccount.employer_NAME}
            status = {loanAccount.loan_STATUS}
          />
        }

        </View>

        {(approvedLoan && loanAccount.loan_STATUS == null) && 
                <TouchableOpacity 
                    onPress={() => navigation.navigate("NewLoan")}
                    style={styles.apprvLoan}>
                <GreenCheckBox />
                <Text style={styles.txtApprove}>You have been pre-approved to get a loan of: </Text>
                  
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Text style={styles.curSign}>₦</Text>
                <Text style={styles.loanAmount}>{loanAmount}</Text>
                </View>
        
                </TouchableOpacity>
        }

        <View style={styles.serviceList}>

                <ServiceCard 
                  image={images.new_loan_bg}
                  label="New Loan"
                  icon={icons.loan}
                  iconStyle={{
                    tintColor: '#0E936E' 
                  }}
                  textStyles={{
                    color: '#155345'
                  }}
                />

                <ServiceCard 
                  onPress={() => (loanAccount.loan_ID && loanAccount.loan_STATUS == 3) ? navigation.navigate("RepayLoan") : Alert.alert("Finserve", "Sorry, you do not have an active loan!")}
                  image={images.repay_loan_bg}
                  label="Repayment"
                  icon={icons.repayment}
                  iconStyle={{
                    tintColor: '#1D2D66' 
                  }}
                  textStyles={{
                    color: '#142665'
                  }}
                />

                <ServiceCard 
                  onPress={() => navigation.navigate("BuyAirtime")}
                  image={images.buy_airtime_bg}
                  label="Buy Airtime"
                  icon={icons.airtime}
                  iconStyle={{
                    tintColor: '#7C1D10' 
                  }}
                  textStyles={{
                    color: '#3E1913'
                  }}
                />

                <ServiceCard 
                  onPress={() => navigation.navigate("BuyData")}
                  image={images.buy_data_bg}
                  label="Buy Data"
                  icon={icons.data}
                  iconStyle={{
                    tintColor: '#964A05' 
                  }}
                  textStyles={{
                    color: '#5A3900'
                  }}
                />

        </View>


        <View style={styles.transWindow}>

                  <View style={styles.transHdr}>
                    <Text style={styles.hdrTxt}>Recent Transactions</Text>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate("History")}
                    style={styles.viewAllbtn}>
                      <Text style={styles.viewTxt}>View All</Text>
                    </TouchableOpacity>
                  </View>
                <View style={styles.transactionList}>

                {
                  transactions == '' &&
                  <Text style={styles.noTransTxt}>No transaction found!</Text>
                }
           
                {transactions != '' &&
                
                 transactions.length > 0 &&

                 transactions.map((item) => {
                    return (
                      <TransactionCard key={item.transaction_id}
                        icon={icons.airtime}
                        amount={Intl.NumberFormat('en-US').format(item.amount)}
                        type={1}
                        date={moment(item.date_created).format('DD-MMM-YYYY')}
                        narration={item.narration}
                      />
  
                    )
                 })

                }

                {/**

                 loanBreakdown.map((item) => {
            return (
              <PaymentScheduleCard key={item.month}
                  month={item.month}
                  principal={item.principal}
                  interest={item.interest}
                  balance={item.balance}
              />
            )
          })
                      <TransactionCard
                      icon={icons.data}
                      amount="10,000"
                      type={1}
                      date="01-Jan-2024"
                      narration="Airtime MTN Recharge"
                    />

                    <TransactionCard
                    icon={icons.airtime}
                    amount="10,000"
                    type={1}
                    date="01-Jan-2024"
                    narration="Airtime MTN Recharge"
                  />

                  <TransactionCard
                  icon={icons.airtime}
                  amount="10,000"
                  type={1}
                  date="01-Jan-2024"
                  narration="Airtime MTN Recharge"
                />
                 */}
            
                </View>
        </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  noTransTxt: {
    alignSelf: 'center',
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.sliderDescText,
    marginBottom: wp(10)
  },
  transactionList: {
    marginVertical: wp(5),
    paddingBottom: wp(15)
  },
  viewTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.primaryRed,
    fontSize: wp(2.5)
  },
  viewAllbtn: {
      borderColor: COLORS.primaryRed,
      borderWidth: 1,
      borderStyle: 'solid',
      paddingHorizontal: wp(2),
      paddingVertical: Platform.OS === 'ios' ? wp(1) : null,
      borderRadius: wp(5),
      marginRight: wp(1)
  },
  hdrTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    color: COLORS.primaryBlue
  },
  transHdr: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  transWindow: {
    backgroundColor: COLORS.White,
    marginTop: Platform.OS === 'android' ? wp(1) : wp(3),
    borderTopRightRadius: wp(8),
    borderTopLeftRadius: wp(8),
    padding: wp(4),
    paddingBottom: wp(8)
  },
  serviceList: {
    marginHorizontal:wp(3),
    marginVertical: wp(5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: wp(3.5),
    flexWrap: 'wrap',
    rowGap: wp(3.5)
  },
  curSign: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(4),
    color: COLORS.LandingGreyText,
    marginRight:wp(1)
  },
  loanAmount: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4.5),
    color: COLORS.primaryRed
  },
  txtApprove: {
    flex: 1,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(2.8),
    marginHorizontal: wp(2),
    color: COLORS.accountTypeDesc
  },
  checkedGreen: {
      backgroundColor: COLORS.checkedColorGreen,
      borderRadius: wp(5),
      height: wp(8),
      width: wp(8),
  },
  apprvLoan: {
    marginTop: wp(3),
    backgroundColor: COLORS.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp(5),
    paddingHorizontal: wp(4),
    paddingVertical: Platform.OS === 'ios' ? wp(3) : wp(2),
    marginHorizontal: wp(3)
  },
  services: {
    marginTop: wp(2),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  dashboardArea: {
    marginTop: wp(3),
    marginHorizontal: wp(2)
  },
  tabAreas: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(3)
  },
  bellBG: {
    backgroundColor: COLORS.notificationBG,
    padding: wp(1.5),
    borderRadius: wp(2.8)
  },
  titleHeader: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.primaryRed,
    fontSize: wp(3.7)
  },
  titleGreeting: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.TextColorGrey,
    fontSize: wp(3.3)
  },
  logoArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(2)
  },
  header: {
    backgroundColor: COLORS.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: wp(8),
    borderBottomRightRadius: wp(8),
    paddingTop:Platform.OS === 'android' ? wp(5) : wp(17),
    paddingBottom: Platform.OS === 'android' ? wp(4) : wp(5),
    paddingHorizontal: wp(3)
  }
})

export default DashboardScreen;