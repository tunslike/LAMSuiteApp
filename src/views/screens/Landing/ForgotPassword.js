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
  import { COLORS, images, FONTS, icons, APIBaseUrl, AppName } from '../../../constants';
  import { OnboardingTextBox, LoaderWindow } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const CreateAccountSchema = Yup.object().shape({

    username: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter your email address'),
})

const ForgotPassword = ({route, navigation}) => {

  const {ValidateCustomerLogin} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [disableBtn, setDisableBtn] = useState(null);

      //validate account number
      const processClientReset = (values) => {
      
        Alert.alert(AppName.AppName, 'Do you want to reset your pin number?', [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => ResetClientPassword(values)},
        ]);
    
      }// end function
  

   //Function to login
   const ResetClientPassword = async (values) => {

    const data = {
      username : values.username,
      pinNumber : "123456"
    }
  
    console.log(data)
  
    setIsLoading(true);
  
      axios.post(APIBaseUrl.developmentUrl + 'customer/resetPin',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {
  
        setIsLoading(false)
        
        if(response.data.responseCode == '200') {
          setDisableBtn(true);
          Alert.alert('Finserve', 'Pin Number reset succesfully! Please check your email')
          return false;
        }

        if(response.data.responseCode == '303') {
  
          Alert.alert('Finserve', 'Sorry, account does not exists!');
          return false;
        }


        if(response.data.responseCode == '404') {
  
          Alert.alert('Finserve', 'Unable to process your request, please retry!');
          return false;
        }

      
      })
      .catch(error => {
        console.log(error);
      });
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

      <LoaderWindow loading={isLoading} />

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
onSubmit={values => processClientReset(values)}
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
          disabled={disableBtn}
          onPress={handleSubmit}
          style={[styles.signInBox, {backgroundColor: (disableBtn) ? COLORS.disablePrimaryBlue : COLORS.primaryBlue}]}>
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