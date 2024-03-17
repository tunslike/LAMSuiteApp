import React, { useContext, useState } from 'react'
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
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { OnboardingTextBox, Loader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const CreateAccountSchema = Yup.object().shape({

    username: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter your email address'),
})

const ForgotPassword = ({route, navigation}) => {

  const {ValidateCustomerLogin, isLoading} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');



   //Function to login
   const AuthenticateUser = async (values) => {
    ValidateCustomerLogin(values.username, values.pinNumber);
  }
  // end of function

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

      {isLoading &&
        <Loader title="Processing your request, please wait..." />
      }

      <View style={styles.logo}>
            <Image source={images.appLogo} 
            style={{
                  height: wp(16), width: wp(16), borderRadius: wp(4), resizeMode: 'contain'
            }} />
      </View>

            {/* FORM STARTS HERE */}
<Formik
initialValues={{
  username: '',
}}
validationSchema={CreateAccountSchema}
onSubmit={values => AuthenticateUser(values)}
>
{({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
<View>
              <View style={styles.whiteBG}> 
              <View style={styles.title}>
                  <Text style={styles.mainTitle}>Reset your PIN</Text>
                  <Text style={styles.titleDesc}>Provide your email address to reset your PIN</Text>
              </View>

              <View style={styles.formBox}>
                <OnboardingTextBox 
                  icon={icons.user}
                  placeholder="Enter your Email"
                  value={values.username}
                  onChange={handleChange('username')}
                />
                {errors.username && 
                  <Text style={styles.formErrortext}>{errors.username}</Text>
                }     
              </View>
          </View>

          <View style={styles.btnBox}>

          <TouchableOpacity
          onPress={handleSubmit}
          style={styles.signInBox}>
               <Text style={styles.signInTxt}>Reset PIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.signBox}>
          <Text style={styles.signTxt}>Login</Text>
      </TouchableOpacity>
          </View>
</View>
)}
</Formik>
      {/* FORM ENDS HERE */}

      </SafeAreaView>
      </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({

  forgotTxt: {
      fontFamily: FONTS.POPPINS_SEMIBOLD,
      fontSize: wp(3),
      color: COLORS.primaryRed
  },
  forgotWindow : {
    marginTop: wp(5),
    alignItems: 'flex-end',
    paddingHorizontal: wp(3)
  },
  formErrortext: {
    fontFamily: FONTS.POPPINS_LIGHT,
    fontSize: wp(2.8),
    marginTop: wp(2),
    marginLeft: wp(6),
    color: COLORS.primaryRed,
    fontWeight: '300',
  },
  signInTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.2),
    color: COLORS.White,
    fontWeight: '400',
  },
  signInBox: {
    alignSelf: 'center',
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: wp(31.3),
    paddingVertical: Platform.OS === 'ios' ? wp(3.9) : wp(3.2),
    borderRadius: wp(4),
    marginBottom: wp(3)
  },
  signTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.2),
    color: COLORS.primaryRed,
    fontWeight: '400',
  },
  signBox: {
    alignSelf: 'center',
    marginTop: wp(1),
    borderWidth:1,
    borderStyle: 'solid',
    borderColor: COLORS.primaryRed,
    paddingHorizontal: wp(33.5),
    paddingVertical: Platform.OS === 'ios' ? wp(3.5) : wp(2.5),
    borderRadius: wp(4)
  },
  btnBox: {
    marginTop: wp(10)
  },  
  titleDesc: {
    marginTop: wp(3),
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    width: wp(70),
    lineHeight: wp(5),
    color: COLORS.sliderDescText,
},
  mainTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(5),
    color: COLORS.primaryBlue,
  },
  title: {
    marginVertical: hp(2),
    marginBottom: wp(8)
  },
  whiteBG: {
    backgroundColor: COLORS.White,
    padding: wp(4),
    paddingVertical: wp(8),
    borderRadius: wp(5),
    marginHorizontal: wp(2.9),
    marginTop: hp(6),
    paddingBottom: wp(19)
  },
  logo: {
    marginHorizontal: wp(5),
    marginTop: hp(6)
  }
})

export default ForgotPassword;