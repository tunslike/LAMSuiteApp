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
  Pressable,
  Dimensions} from 'react-native';
  import { Formik } from 'formik';
  import * as Yup from 'yup'
  import axios from 'axios';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { useDispatch } from 'react-redux';
  import { useSelector } from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { Loader, DropdownTextBox, InnerHeader, BiodataTextbox, FormButton } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { updateNOKdataStatus } from '../../../store/customerSlice';

  const CreateAccountSchema = Yup.object().shape({
    nok_lastname: Yup.string()
        .min(3, 'Minimum characters is 3!')
        .max(30, 'Maximum characters is 30!').required('Enter last name'),
    nok_firstname: Yup.string()
        .min(3, 'Minimum characters is 3!')
        .max(30, 'Maximum characters is 30!').required('Enter first name'),
    nok_phone: Yup.string()
        .min(6, 'Minimum characters is 6!')
        .max(11, 'Maximum characters is 11!')
        .matches(/^[0-9]+$/, 'Enter number value!')
        .required('Enter Phone number!'),
    nok_email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    nok_address: Yup.string()
    .min(10, 'Minimum characters is 10!')
    .max(50, 'Maximum characters is 50!').required('Enter Address'),
    nok_locality: Yup.string()
    .min(3, 'Minimum characters is 6!')
    .max(50, 'Maximum characters is 25!').required('Enter Area/Locality'),

  })

  //Drop down Gender
const genderlist = ["Male", "Female"];

const statesList = ["Abuja", "Abia", "Adamawa", "Akwa Ibom","Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
"Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
"Kebbi", "Kogi", "Kwara", "Lagos", "Nassarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
"Rivers","Sokoto", "Taraba", "Yobe","Zamfara"]

const relationshipList = ["Father", "Mother", "Son", "Daughter", "Brother", "Sister", "Friend"]

const NOKDetailsScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.customerData);

  const [isLoading, setIsLoading] = useState(false);
  const customerID = useSelector((state) => state.account.customerEntryID);
  const [nok_gender, setNOKGender] = useState('');
  const [nok_relationship, setNOKRelationship] = useState('');
  const [nok_state, setNOKState] = useState('');

  const confirmValidateAccountData = (values) => {

    setIsLoading(false);

    Alert.alert(AppName.AppName, 'Do you want to save NOK details?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => validateAccountData(values)},
    ]);
  }

  // function to verify data
  const validateAccountData = (values) => {

    //send data
    if(values == null) {
      Alert.alert("All fields are compulsory!")
      return;
    }

    //data
    const data = {
      customer_id : customerData.customer_ENTRY_ID,
      nok_lastname : values.nok_lastname,
      nok_firstname : values.nok_firstname,
      nok_gender : nok_gender,
      nok_relationship: nok_relationship,
      nok_phone: values.nok_phone,
      nok_email: values.nok_email,
      nok_address: values.nok_address,
      nok_areaLocality: values.nok_locality,
      nok_state: nok_state
    };

    setIsLoading(true);

      axios.post(APIBaseUrl.developmentUrl + 'customer/updateNOKData',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {

        setIsLoading(false)

        if(response.data.response.responseCode == 200) {

          
          dispatch(updateNOKdataStatus(1));          
          Alert.alert('Finserve', 'Your NOK Details has been saved!')
          navigation.navigate("KYCStatus");

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
        setIsLoading(false)
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
      
    <InnerHeader onPress={() => navigation.goBack()} title="NOK Details" />

    {isLoading &&
      <Loader title="Processing your request, please wait..." />
    }

  {/* FORM STARTS HERE */}
<Formik
    initialValues={{
      nok_lastname: '',
      nok_firstname: '',
      nok_phone: '',
      nok_email: '',
      nok_address: '',
      nok_locality: '',
    }}
    validationSchema={CreateAccountSchema}
    onSubmit={values => confirmValidateAccountData(values)}
    >
{({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
    <View>
                  <View style={styles.whiteBG}> 
                  <View style={styles.title}>
                  <Text style={styles.titleDesc}>Complete Next of Kin details below</Text>
              </View>

              <View style={styles.formBox}>


  <View style={styles.formRow}>
  <View>
      <BiodataTextbox 
      label="Last Name"
      value={values.nok_lastname}
      onChange={handleChange('nok_lastname')}
    /> 
    {errors.nok_lastname && 
      <Text style={styles.errorLabel}>{errors.nok_lastname}</Text>
    }
  </View>
  <View>
      <BiodataTextbox 
      label="First Name"
      value={values.nok_firstname}
      onChange={handleChange('nok_firstname')}
    /> 
    {errors.nok_firstname && 
      <Text style={styles.errorLabel}>{errors.nok_firstname}</Text>
    }
  </View>
  </View>
  
  <View style={styles.formRow}>
  <DropdownTextBox 
  data={genderlist}
  label="Gender"
  onSelect={(selectedItem, index) => {
    setNOKGender(selectedItem);
  }}
  />
  <DropdownTextBox 
  data={relationshipList}
  label="Relationship"
  onSelect={(selectedItem, index) => {
    setNOKRelationship(selectedItem);
  }}
  />
  </View>
  
  <View style={styles.formRow}>
  <View>
  <BiodataTextbox 
    label="Phone Number"
    value={values.nok_phone}
    onChange={handleChange('nok_phone')}
  /> 
  {errors.nok_phone && 
    <Text style={styles.errorLabel}>{errors.nok_phone}</Text>
  }
  </View>
  <View>
    <BiodataTextbox 
    label="Email Address"
    value={values.nok_email}
    onChange={handleChange('nok_email')}
    /> 
    {errors.nok_email && 
      <Text style={styles.errorLabel}>{errors.nok_email}</Text>
    }
  </View>
  </View>
  
  <View style={{marginBottom: wp(3)}}>
    <BiodataTextbox 
    label="House Address/Street"
    value={values.nok_address}
    full={true}
    onChange={handleChange('nok_address')}
    /> 
    {errors.nok_address && 
      <Text style={styles.errorLabel}>{errors.nok_address}</Text>
    }
  </View>
  
  <View style={styles.formRow}>
  <View>
    <BiodataTextbox 
    label="Area/Locality"
    value={values.nok_locality}
    onChange={handleChange('nok_locality')}
    /> 
    {errors.nok_locality && 
      <Text style={styles.errorLabel}>{errors.nok_locality}</Text>
    }
  </View>
  <DropdownTextBox 
  data={statesList}
  label="State"
  onSelect={(selectedItem, index) => {
    setNOKState(selectedItem);
  }}
  />
  </View>
       
              </View>
              </View>

              <View style={styles.btnBox}>
              <FormButton onPress={handleSubmit} label="Save and Continue" />
              </View>
    </View>
)}
</Formik>
 {/* FORM ENDS HERE */}

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  nextBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: wp(1),
    marginTop: wp(2),
    marginBottom: wp(1)
  },
  nextStep: {
     fontFamily: FONTS.POPPINS_REGULAR,
     fontSize: wp(3),
     color: COLORS.primaryRed
  },
  completeStatus: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3), 
    color: COLORS.sliderDescText, 
    textAlign: 'right'
  },
  errorLabel: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.7),
    color: COLORS.primaryRed,
    marginLeft: wp(3.5),
    marginTop: wp(2)
  },
  btnBox: {
    marginVertical: wp(5)
},
  textLinkStyle: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
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
  formRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: wp(2),
    alignItems: 'center',
    marginBottom: wp(3)
  },
    titleDesc: {
      marginLeft: wp(3),
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: wp(3),
      width: wp(70),
      lineHeight: wp(5),
      marginBottom: wp(3),
      color: COLORS.primaryRed,
    },
    mainTitle: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(4.3),
        color: COLORS.primaryBlue,
      },
      title: {
        marginVertical: hp(2)
      },
      whiteBG: {
        backgroundColor: COLORS.White,
        padding: wp(3),
        borderRadius: wp(8),
        marginHorizontal: wp(2.9),
        marginTop: hp(3),
        paddingBottom: wp(4)
      },
      logo: {
        marginHorizontal: wp(5),
        marginTop: hp(1)
      }
})

export default NOKDetailsScreen;