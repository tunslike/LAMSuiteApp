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
  import axios from 'axios';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { useDispatch } from 'react-redux';
  import { useSelector } from 'react-redux';
  import TextLink from 'react-native-text-link';
  import { COLORS, images, FONTS, icons, APIBaseUrl, AppName } from '../../../constants';
  import { OnboardingTextBox, FormButton, LoaderWindow } from '../../components';
  import { updateFullname, updateEmail, updatePhone, updatePinNumber } from '../../../store/accountSlice';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  const CreateAccountSchema = Yup.object().shape({
      fullname: Yup.string()
          .min(6, 'Minimum characters is 6!')
          .max(25, 'Maximum characters is 25!').required('Please enter your fullname'),
      email: Yup.string()
        .email('Please enter a valid email')
        .required('Please enter your email address'),
      phone: Yup.string()
        .min(11, 'Phone number must be 11 digits')
        .max(11, 'Phone number must be 11 digits')
        .matches(/^[0-9]+$/, 'Please enter a valid phone number')
        .required('Please enter your phone number')
  })

const CreateAccountScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  // function to verify data
  const validateAccountData = (values) => {

    const data = {
      full_name : values.fullname,
      phoneNumber: values.phone,
      emailAddress : values.email
    };

    setIsLoading(true);

    axios.post(APIBaseUrl.developmentUrl + 'customer/validateEntryRecord',data,{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      setIsLoading(false)

      console.log(response)

      if(response.data.responseCode == 200) {

          //send data
          dispatch(updateFullname(values.fullname));
          dispatch(updateEmail(values.email));
          dispatch(updatePhone(values.phone));

          navigation.navigate("VerifyPhone");

      }else{

        Alert.alert('Finserve','Sorry! Duplicate records found. Please try again')

      }

    })
    .catch(error => {
      setIsLoading(false)
      console.log(error);
    });

    //navigation.navigate("VerifyPhone", {full_name:values.fullname, email_address: values.email, phone_number:values.phone});

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
 <LoaderWindow loading={isLoading} />
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logo}>
            <Image source={images.appLogo} 
            style={{
                  height: wp(16), width: wp(16), borderRadius: wp(4), resizeMode: 'contain'
            }} />
      </View>

  {/* FORM STARTS HERE */}
<Formik
    initialValues={{
      fullname: '',
      email: '',
      phone: ''
    }}
    validationSchema={CreateAccountSchema}
    onSubmit={values => validateAccountData(values)}
    >
{({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
    <View>
                  <View style={styles.whiteBG}> 
                  <View style={styles.title}>
                      <Text style={styles.mainTitle}>Create an Account</Text>
                      <Text style={styles.titleDesc}>Please enter the details below to
                      create an account</Text>
                  </View>

                  <View style={styles.formBox}>
                    <OnboardingTextBox 
                      icon={icons.user}
                      placeholder="Enter your fullname"
                      value={values.fullname}
                      onChange={handleChange('fullname')}
                    />
                    {errors.fullname && 
                      <Text style={styles.formErrortext}>{errors.fullname}</Text>
                    }
                    <OnboardingTextBox 
                      icon={icons.email}
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange('email')}
                    />
                    {errors.email && 
                      <Text style={styles.formErrortext}>{errors.email}</Text>
                    }
                    <OnboardingTextBox 
                      icon={icons.phone}
                      placeholder="Enter your phone"
                      value={values.phone}
                      phone={1}
                      maxlength={11}
                      onChange={handleChange('phone')}
                    /> 
                    {errors.phone && 
                      <Text style={styles.formErrortext}>{errors.phone}</Text>
                    }       
                  </View>

                  <View style={styles.termsBody}>

                  <TextLink 
                  textStyle={styles.textLinkStyle}
                  textLinkStyle={{color: COLORS.primaryRed}}
                  links={[
                    {
                      text: 'Terms & Conditions',
                      onPress: () =>  console.log('link to terms'),
                    },
                    {
                      text: 'Privacy Policy',
                      onPress: () =>  console.log('link to privacy'),
                    },
                  ]}>
                  By continuing, you agree to our Terms & Conditions and Privacy Policy.
                  </TextLink>
                    
                  </View>
              </View>

              <View style={styles.btnBox}>
              <FormButton onPress={handleSubmit} label="Continue" />
              <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={styles.signBox}>
                  <Text style={styles.signTxt}>Already have an account? Login</Text>
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
  textLinkStyle: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.9),
    color: COLORS.sliderDescText,
    lineHeight: wp(4)
  },
  termsBody: {
      marginTop: wp(5),
      marginHorizontal: wp(3)
  },
  formErrortext: {
    fontFamily: FONTS.POPPINS_LIGHT,
    fontSize: wp(2.8),
    marginTop: wp(2),
    marginLeft: wp(6),
    color: COLORS.primaryRed,
    fontWeight: '300',
  },
  signTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.2),
    color: COLORS.primaryRed,
    fontWeight: '400',
  },
  signBox: {
    alignSelf: 'center',
    marginTop: wp(3)
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
    marginVertical: hp(2)
  },
  whiteBG: {
    backgroundColor: COLORS.White,
    padding: wp(4),
    borderRadius: wp(5),
    marginHorizontal: wp(3.2),
    marginTop: hp(5),
    paddingBottom: wp(10)
  },
  logo: {
    marginHorizontal: wp(5),
    marginTop: hp(5)
  }
})

export default CreateAccountScreen;