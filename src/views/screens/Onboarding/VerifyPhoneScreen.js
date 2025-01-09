import React, {useState, useEffect} from 'react'
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
  Dimensions} from 'react-native';
  import { Formik } from 'formik';
  import * as Yup from 'yup'
  import axios from 'axios';
  import { OtpInput } from 'react-native-otp-entry';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { useSelector } from 'react-redux';
  import { useDispatch } from 'react-redux';
  import { COLORS, images, FONTS, icons, SendChampAPI, APIBaseUrl } from '../../../constants';
  import { OnboardingTextBox, FormButton, LoaderWindow } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const VerifyPhoneScreen = ({route, navigation}) => {

  const {otpValue, verification_Id, phoneNumber} = route.params;

  const fullname = useSelector((state) => state.account.fullname);
  const email = useSelector((state) => state.account.email);
  const phone = useSelector((state) => state.account.phone);

  const [activateButton, setActivateButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [newOtpValue, setNewOTPValue] = useState('');
  const [counter, setCounter] = useState(60);

  // function to enable verify button
  const VerifyOTPValue = (text) => {
  
    if(text != '' && text.length == 5) {
      console.log('it is completed here');
      setNewOTPValue(text);
      setActivateButton(false)
    }else{
      setActivateButton(true);
    }

  }// end of function

  // function to verify data
  const sendRegistrationOTPVerification = () => {


    const data = {
      verification_id : verification_Id,
      otp_value : newOtpValue,
      phoneNumber : phoneNumber
    };

    setIsLoading(true);

    axios.post(APIBaseUrl.developmentUrl + 'customer/verifyRegistrationOTP',data,{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      setIsLoading(false)

      console.log(response.data)

      if(response.data == 'verified') {
        navigation.navigate("CreatePIN");
        return;
      }

      Alert.alert("Finserve", "The OTP you have entered is incorrect!")
    
    })
    .catch(error => {
      setIsLoading(false)
      console.log(error);
    });

  }

  const sendVerifyPhoneOTP = () => {

    let sms_phone = phoneNumber.slice(1);

    const data = {
     to: `234${sms_phone}`,
     message: `Dear Customer, your Finserve registration verification OTP number is ${otpValue}. Expires in 15 minutes. Thank you`,
     sender_name: 'SAlert',
     route: 'dnd'
    };

    console.log(data)

    axios.post(SendChampAPI.live_base_url + 'sms/send',data,{
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + SendChampAPI.accessrt_key
      }
    })
    .then(response => {

      console.log(response.data)

    })
    .catch(error => {
      console.log(error);
    });
  }


    //USE EFFECT
    useEffect(() => {

      if(phoneNumber != '') {
        //sendVerifyPhoneOTP();
      }
      

      //counter > 0 && setTimeout(() => setCounter(counter - 1), 5000);
  
    }, []);

  
  return (
    <KeyboardAwareScrollView 
    enableOnAndroid={true}
    keyboardShouldPersistTaps={"handled"}
    extraScrollHeight={-300}
    contentContainerStyle={{
      flexGrow: 1,
      backgroundColor: COLORS.BackgroundGrey
    }}
 > 

 <SafeAreaView>
 <StatusBar barStyle="dark-content" />
 <LoaderWindow loading={isLoading} />
 <View style={styles.logo}>
       <Image source={images.appLogo} 
       style={{
             height: wp(16), width: wp(16), borderRadius: wp(4), resizeMode: 'contain'
       }} />
 </View>


 <View style={styles.whiteBG}> 


    <View style={styles.title}>
      <Text style={styles.mainTitle}>Account Verification</Text>
      <Text style={styles.titleDesc}>Please enter the 5-digit code we sent to your phone 
      number and email to complete verification</Text>
    </View>

    <View style={styles.otpBox}>
       <OtpInput 
          numberOfDigits={5}
          onTextChange={(text) => VerifyOTPValue(text)}
          focusColor={COLORS.primaryRed}
          focusStickBlinkingDuration={500}
          onFilled={(text) => VerifyOTPValue(text)}
          TextInputProps={
            keyboardType="numeric"
          }
          theme={{
            pinCodeTextStyle: {
               color: COLORS.primaryRed,
               fontFamily: FONTS.POPPINS_MEDIUM,
               fontSize: wp(7.5),
               paddingTop: wp(1.5)
            },
            pinCodeContainerStyle: {
              backgroundColor: COLORS.White,
              width: wp(13.5), height: wp(14.5),
              borderRadius: wp(4),
              borderWidth: wp(0.3),
              borderColor: COLORS.TextBoxBorderGrey,
              color: COLORS.primaryBlue,
              fontFamily: FONTS.POPPINS_MEDIUM,
              marginHorizontal: wp(2)
            }
          }}
       />
    </View>

    <Text style={styles.promptTxt}>Code is valid for 15 minutes</Text>
    <TouchableOpacity 
      onPress={(counter == 0) ? () => ResendValidateOTP() : null}
      style={styles.btnResend}>
      {
        counter == 0 && 
        <Text style={styles.txtResend}>Didn’t get code? Resend</Text>
      }

    </TouchableOpacity>
 </View>

 <View style={styles.btnBox}>
 <FormButton 
    onPress={() => sendRegistrationOTPVerification()} 
    disable={activateButton}
    label="Verify Code" />
 </View>

 </SafeAreaView>
 </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  txtResend: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.1),
    color: COLORS.primaryBlue,
    textDecorationLine: 'underline'
  },
  btnResend: {
    marginTop: wp(3),
    alignSelf: 'center',
    marginBottom: hp(4),
  },
  btnResend: {
    marginTop: wp(3),
    alignSelf: 'center',
    marginBottom: hp(4)
  },
  promptTxt: {
      color: COLORS.primaryRed,
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: wp(2.8),
      marginTop: wp(7),
      alignSelf: 'center'
  },
  btnBox: {
    marginTop: wp(10)
  },  
  otpBox: {
    marginTop: wp(7),
  },
  titleDesc: {
    marginTop: wp(3),
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.8),
    width: wp(70),
    lineHeight: wp(4.5),
    color: COLORS.sliderDescText,
},
  mainTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(5),
    color: COLORS.primaryBlue,
  },
  title: {
    marginVertical: hp(2)
  },
  whiteBG: {
    backgroundColor: COLORS.White,
    padding: wp(4),
    borderRadius: wp(5),
    marginHorizontal: wp(3.2),
    marginTop: hp(6),
    paddingBottom: wp(8)
  },
  logo: {
    marginHorizontal: wp(5),
    marginTop: hp(6)
  }
})

export default VerifyPhoneScreen;