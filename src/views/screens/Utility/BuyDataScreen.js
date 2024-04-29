import React, { useState } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Keyboard,
  Text, 
  View, 
  TextInput,
  Alert,
  ScrollView,
  Dimensions} from 'react-native';
  import axios from 'axios';
  import { useSelector, useDispatch } from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { NetworkIcon, NetworkAmount, Loader, InnerHeader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const BuyDataScreen = ({navigation}) => {

  // CUSTOMER STORE
  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);
  const accountNumberID = useSelector((state) => state.customer.bankAccountID);

  // STATES
  const [isLoading, setIsLoading] = useState(false)
  const [activeNetwork, setActiveNetwork] = useState(0);
  const [tenor, setTenor] = useState(0)

      //function to change tenor
    const changeLoanTenor = (tenor) => {
      setTenor(tenor)
      }//end of function

    //function to change tenor
    const selectMobileMetwork = (network) => {
      setActiveNetwork(network)
    }//end of function
  

    const processAirtimePurchase = () => {

    }

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

      <InnerHeader onPress={() => navigation.goBack()} title="Buy Data" />

      <View style={styles.midBody}>
        <Text style={styles.preTitle}>Select Network Provider</Text>

        <View style={styles.networkList}>
            <NetworkIcon onPress={() =>  selectMobileMetwork(1)} active={(activeNetwork == 1) ? true : null} image={images.mtn_logo} />
            <NetworkIcon onPress={() =>  selectMobileMetwork(2)} active={(activeNetwork == 2) ? true : null}  image={images.airtel_logo} />
            <NetworkIcon onPress={() =>  selectMobileMetwork(3)} active={(activeNetwork == 3) ? true : null}  image={images.n_mobile_logo} />
            <NetworkIcon onPress={() =>  selectMobileMetwork(4)} active={(activeNetwork == 4) ? true : null}  image={images.glo_logo} />
        </View>


        <View style={styles.numberArea}>

          <Text style={styles.amountTitle}>Enter Phone Number</Text>

          <TextInput
            style={styles.mobileBox}
            placeholderTextColor={COLORS.darkGray}
            keyboardType={"phone-pad"}
            autoCapitalize='none'
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            returnKeyType='next'
            maxLength={11}
            placeholder="Sample: 09000100111"
          />
        </View>
        

        <Text style={styles.priceTitle}>Select or Enter Amount</Text>

        <View style={styles.amountBox}>
        <NetworkAmount onPress={() => changeLoanTenor(1)} active={(tenor == 1) ? true : null} title="₦ 200" />
        <NetworkAmount onPress={() => changeLoanTenor(2)} active={(tenor == 2) ? true : null}  title="₦ 500" />
        <NetworkAmount onPress={() => changeLoanTenor(3)} active={(tenor == 3) ? true : null} title="₦ 1,000" />
        <NetworkAmount onPress={() => changeLoanTenor(6)} active={(tenor == 6) ? true : null} title="₦ 2,000" />
    </View>

      <View>
        <Text style={styles.txtDisburse}>Enter Amount</Text>
        <TextInput
        style={styles.manuelAmt}
        placeholderTextColor={COLORS.darkGray}
        keyboardType={"phone-pad"}
        autoCapitalize='none'
        onSubmitEditing={Keyboard.dismiss}
        blurOnSubmit={false}
        returnKeyType='next'
        placeholder='Enter an amount here'
        maxLength={11}
        />
      </View>


      <TouchableOpacity
        style={styles.buyAirtime}
      >
        <Text style={styles.continueBtnTxt}>Buy Data</Text>
        <Image source={icons.arrow_thick} 
        style={{
            height:wp(4), width: wp(4), marginLeft: wp(3), resizeMode: 'contain', tintColor: COLORS.White
        }}/>

      </TouchableOpacity>


      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  buyAirtime: {
    backgroundColor: COLORS.primaryBlue,
    marginTop: wp(15),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(25),
    paddingVertical: wp(3.5),
    borderRadius: wp(4),
    marginBottom: wp(3),
  },
  continueBtnTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    color: COLORS.White,
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
  manuelAmt: {
    borderColor: COLORS.companySetupBorder,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: wp(8),
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.5),
    color: COLORS.TextColorGrey,
    borderRadius: wp(5),
    paddingHorizontal: wp(3.5),
    paddingVertical: Platform.OS === 'ios' ? wp(4) : wp(2),
    marginTop: wp(3),
    marginHorizontal: wp(1),
    marginHorizontal: wp(13),
    textAlign: 'center'
  },
  txtDisburse: {
    color: COLORS.primaryRed,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.2),
    textAlign: 'center'
},
  amountBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: wp(3),
    marginTop: wp(3),
    marginBottom: wp(7)
  },
  priceTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.2),
    color: COLORS.accountTypeDesc,
    alignSelf: 'center',
    marginTop: wp(6)
  },
  mobileBox: {
    borderColor: COLORS.companySetupBorder,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: wp(8),
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.5),
    color: COLORS.TextColorGrey,
    borderRadius: wp(5),
    paddingHorizontal: wp(3.5),
    paddingVertical: Platform.OS === 'ios' ? wp(4) : wp(2),
    marginTop: wp(3),
    marginHorizontal: wp(1),
    marginHorizontal: wp(13),
    textAlign: 'center'
  },
  amountTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.2),
    color: COLORS.primaryBlue,
    alignSelf: 'center',
    marginTop: wp(2)
  },

  numberArea: {
    borderTopColor: COLORS.BackgroundGrey,
    borderTopWidth: 1,
    borderBottomColor: COLORS.BackgroundGrey,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: wp(7),
    paddingTop: wp(3.5),
    marginTop: wp(6)
},

  networkList: {
    marginTop: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    marginTop: wp(3),
    paddingBottom: wp(3)
  }
})

export default BuyDataScreen;