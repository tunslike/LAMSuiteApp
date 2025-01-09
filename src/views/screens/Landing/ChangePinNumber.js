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
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { OnboardingTextBox, LoaderWindow } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import { useSelector } from 'react-redux';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const CreateAccountSchema = Yup.object().shape({

      pinNumber: Yup.string()
      .min(5, 'Invalid PIN number')
      .max(5, 'Invalid PIN number')
      .matches(/^[0-9]+$/, 'Invalid PIN number!')
      .required('Enter new PIN Number!'),

      confirmPin: Yup.string()
      .required('Confirm new PIN Number!')
      .oneOf([Yup.ref('pinNumber'), null], 'PIN number must match!')
})

const ChangePinNumber = ({route, navigation}) => {

  const customerData = useSelector((state) => state.customer.customerData);
  
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleCon, setIsVisibleCon] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);


    //validate account number
    const processChangePIN = (values) => {
      
        Alert.alert(AppName.AppName, 'Do you want to change your pin number?', [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => ChangeClientPIN(values)},
        ]);
    
      }// end function


   //Function to login
   const ChangeClientPIN = async (values) => {

    const data = {
      username : customerData.email_ADDRESS,
      pinNumber : values.pinNumber
    }
  
    console.log(data)
  
    setIsLoading(true);
  
      axios.post(APIBaseUrl.developmentUrl + 'customer/changePinNumber',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {
  
        setIsLoading(false)
        
        if(response.data.responseCode == 200) {

          setDisableBtn(true);
          Alert.alert('Finserve', 'Pin Number has been changed succesfully! Please login again')
          navigation.navigate("Login");
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
  pinNumber: '',
  confirmPin: ''
}}
validationSchema={CreateAccountSchema}
onSubmit={values => processChangePIN(values)}
>
{({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
<View>
              <View style={styles.whiteBG}> 
              <View style={styles.title}>
                  <Text style={styles.mainTitle}>Change your PIN</Text>
                  <Text style={styles.titleDesc}>Enter your new PIN Number below to change your pin number</Text>
              </View>

              <View style={styles.formBox}>
         
                <OnboardingTextBox 
                  icon={icons.change_password}
                  placeholder="Enter new PIN"
                  value={values.pinNumber}
                  setSecureText={isVisible}
                  phone={1}
                  length={5}
                  eye_type={isVisible == true ? icons.hidePassword : icons.showPassword}
                  visibleOnPress={() => setIsVisible(!isVisible)}
                  pwd={true}
                  onChange={handleChange('pinNumber')}
                />
                {errors.pinNumber && 
                  <Text style={styles.formErrortext}>{errors.pinNumber}</Text>
                } 
                <OnboardingTextBox 
                icon={icons.change_password}
                placeholder="Confirm new PIN"
                value={values.confirmPin}
                setSecureText={isVisibleCon}
                phone={1}
                length={5}
                eye_type={isVisibleCon == true ? icons.hidePassword : icons.showPassword}
                visibleOnPress={() => setIsVisibleCon(!isVisibleCon)}
                pwd={true}
                onChange={handleChange('confirmPin')}
              />
              {errors.confirmPin && 
                <Text style={styles.formErrortext}>{errors.confirmPin}</Text>
              }      
              </View>
          </View>

          <View style={styles.btnBox}>

          <TouchableOpacity
          onPress={handleSubmit}
          style={styles.signInBox}
          disabled={disableBtn}>
               <Text style={styles.signInTxt}>Change PIN</Text>
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

export default ChangePinNumber;