import React, {useState} from 'react'
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
  import { OtpInput } from 'react-native-otp-entry';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { OnboardingTextBox, FormButton } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const VerifyPhoneScreen = ({route, navigation}) => {

  const {full_name, email_address, phone_number} = route.params;

  const[otpValue, SetOtpValue] = useState('');
  const [activateButton, setActivateButton] = useState(true);

  // function to enable verify button
  const VerifyOTPValue = (text) => {
  
    if(text != '' && text.length == 4) {
      console.log('it is completed here');
      setActivateButton(false)
    }else{
      setActivateButton(true);
    }

  }// end of function

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
 <View style={styles.logo}>
       <Image source={images.appLogo} 
       style={{
             height: wp(16), width: wp(16), borderRadius: wp(4), resizeMode: 'contain'
       }} />
 </View>


 <View style={styles.whiteBG}> 


    <View style={styles.title}>
      <Text style={styles.mainTitle}>Verify Phone Number</Text>
      <Text style={styles.titleDesc}>Please enter the 4-digit code we sent to your phone 
      number to verify your account</Text>
    </View>

    <View style={styles.otpBox}>
       <OtpInput 
          numberOfDigits={4}
          onTextChange={(text) => VerifyOTPValue(text)}
          focusColor={COLORS.primaryRed}
          focusStickBlinkingDuration={500}
          onFilled={(text) => VerifyOTPValue(text)}
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

    <Text style={styles.promptTxt}>Code is valid for 60 seconds</Text>
    <TouchableOpacity style={styles.btnResend}>
          <Text style={styles.txtResend}>Didn’t get code? Resend</Text>
    </TouchableOpacity>
 </View>

 <View style={styles.btnBox}>
 <FormButton 
    onPress={() => navigation.navigate("CreatePIN", {fullname: full_name, email: email_address, phone: phone_number})} 
    disable={activateButton}
    label="Verify Phone Number" />
 </View>

 </SafeAreaView>
 </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  txtResend: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.1),
    color: COLORS.TextColorGrey
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
    marginHorizontal: wp(2.9),
    marginTop: hp(6),
    paddingBottom: wp(8)
  },
  logo: {
    marginHorizontal: wp(5),
    marginTop: hp(6)
  }
})

export default VerifyPhoneScreen;