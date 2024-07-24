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
  import { useSelector} from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import {LoanPaymentTypeCard, LoaderWindow, InnerHeader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ViewProfileScreen = ({navigation}) => {

  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);

  // STATES
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState('');

    // function to verify data
    const fetchViewProfile = () => {

      setIsLoading(true);
  
        axios.get(APIBaseUrl.developmentUrl + 'customer/fetchCustomerProfile?CustomerID=' + customerID,{},{
          headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8082'
          }
        })
        .then(response => {
  
          setIsLoading(false)
  
          setProfile(response.data);      

        })
        .catch(error => {
          console.log(error);
        });
  
    }// end of function 


  //USE EFFECT
  useEffect(() => {

    fetchViewProfile();

  }, []);


  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>
      <LoaderWindow loading={isLoading} />

      <InnerHeader onPress={() => navigation.goBack()} title="View Profile" />

      <View style={styles.midBody}>
  
  

   <Text style={styles.paymentTitle}>Account Details</Text>

   <View style={styles.bank_details}>
   <Text style={styles.bank_name}>Account Type</Text>
   <Text style={styles.profile_txt}>{profile.account_type}</Text>
</View>

   <View style={styles.bank_details}>
   <Text style={styles.bank_name}>Username</Text>
   <Text style={styles.profile_txt}>{profile.username}</Text>
</View>

  <View style={styles.bank_details}>
      <Text style={styles.bank_name}>Full Name</Text>
      <Text style={styles.profile_txt}>{profile.full_name}</Text>
  </View>

  <View style={styles.bank_details}>
  <Text style={styles.bank_name}>Phone Number</Text>
  <Text style={styles.profile_txt}>{profile.phone_number}</Text>
</View>


<View style={styles.bank_details}>
<Text style={styles.bank_name}>Email Address</Text>
<Text style={styles.profile_txt}>{profile.email_address}</Text>
</View>

<View style={styles.bank_details}>
<Text style={styles.bank_name}>Company</Text>
<Text style={styles.profile_txt}>{profile.employer_name}</Text>
</View>


   </View>

    

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  profile_txt: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.1)
  },  
  bank_name: {
    color: COLORS.ButtonBorderBlue,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.1)
  },
  bank_details: {
    borderColor: COLORS.TextBoxBorderGrey,
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp(3),
    columnGap: wp(8),
    marginHorizontal: wp(6),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3.9),
    marginBottom: wp(3.3)
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
    fontSize: wp(6),
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
    paddingVertical: wp(4.3),
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
    color: COLORS.primaryRed,
    marginTop: wp(8),
    marginHorizontal: wp(7),
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

export default ViewProfileScreen;