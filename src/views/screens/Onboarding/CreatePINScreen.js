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
  import { useDispatch } from 'react-redux';
  import { updatePinNumber } from '../../../store/accountSlice';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { OnboardingTextBox, FormButton } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CreatePINScreen = ({navigation}) => {

  const dispatch = useDispatch();


  const [activateButton, setActivateButton] = useState(true);
  const [pinNumber, setPinNumber] = useState('');

    // function to enable verify button
    const VerifyOTPValue = (text) => {
  
      if(text != '' && text.length == 5) {
        
        console.log('it is completed here');
        
        dispatch(updatePinNumber(text));
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
                <Text style={styles.mainTitle}>Create your PIN</Text>
                <Text style={styles.titleDesc}>Please enter a secret 5-digit PIN Number 
                to secure your account</Text>
              </View>

              
    <View style={styles.otpBox}>
    <OtpInput 
 
       numberOfDigits={5}
       onTextChange={(text) =>  VerifyOTPValue(text)}
       focusColor={COLORS.primaryRed}
       focusStickBlinkingDuration={500}
       onFilled={(text) =>  VerifyOTPValue(text)}
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
 <Text style={styles.promptTxt}>Your PIN number will be used to log into your account, please do not share with anyone</Text>


      </View>
      <View style={styles.btnBox}>
      <FormButton 
          onPress={() => navigation.navigate("AccountType")} 
          disable={activateButton}
          label="Save PIN Number" />
      </View>

    </SafeAreaView>
 </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  promptTxt: {
    color: COLORS.primaryRed,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.8),
    marginTop: wp(10),
    width: wp(75),
    alignSelf: 'center',
    textAlign:'center'
},
  otpBox: {
    marginTop: wp(7),
  },
  btnBox: {
    marginTop: wp(10)
  },
  titleDesc: {
    marginTop: wp(3),
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.8),
    width: wp(75),
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
    paddingBottom: wp(15)
  },
  logo: {
    marginHorizontal: wp(5),
    marginTop: hp(6)
  }
})

export default CreatePINScreen;