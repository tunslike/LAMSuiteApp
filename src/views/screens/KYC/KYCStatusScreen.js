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
  import { useSelector, useDispatch } from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import {KYCStatusCardItem, Loader, InnerHeader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const KYCStatusScreen = ({navigation, route}) => {

  // CUSTOMER STORE
  const customerData = useSelector((state) => state.customer.customerData);
  const bioDataStatus = useSelector((state) => state.customer.biodata);
  const empDataStatus = useSelector((state) => state.customer.empdata);
  const nokDataStatus = useSelector((state) => state.customer.nokdata);
  const docDataStatus = useSelector((state) => state.customer.docdata);

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


  //USE EFFECT
   useEffect(() => {
          console.log(customerData)
   }, []);

  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>

      {isLoading &&
        <Loader title="Processing your request, please wait..." />
      }

      <InnerHeader onPress={() => navigation.goBack()} title="KYC Status" />

      <View style={styles.midBody}>


   <Text style={styles.paymentTitle}>Complete your KYC to be eligible for loan</Text>

   <KYCStatusCardItem 
       onPress={() => bioDataStatus == 0 ? navigation.navigate("PersonalDetails") : null}
       icon={icons.kyc_user}
       channelName="Bio-data"
       active={bioDataStatus == 1 ? true : false}
   />
   
   <KYCStatusCardItem 
      onPress={() => empDataStatus == 0 ? navigation.navigate("EmployerDetails") : null}
      icon={icons.kyc_employer}
      channelName="Employment"
      active={empDataStatus == 1 ? true : false}
   />

   <KYCStatusCardItem 
      onPress={() => nokDataStatus == 0 ? navigation.navigate("NOKDetails") : null}
      icon={icons.kyc_nok}
      channelName="Nex of Kin"
      active={nokDataStatus == 1 ? true : false}
   />

   <KYCStatusCardItem 
   onPress={() => docDataStatus == 0 ? navigation.navigate("DocumentUpload") : null}
   icon={icons.kyc_upload}
   channelName="Upload Documents"
   active={docDataStatus == 1 ? true : false}
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
    marginLeft:wp(7),
    marginBottom: wp(7)
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
    marginTop: hp(2),
    paddingBottom: wp(4),
    minHeight: wp(110)
  }
})

export default KYCStatusScreen;