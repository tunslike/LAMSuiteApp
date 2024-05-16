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
  import * as Yup from 'yup';
  import axios from 'axios';
  import moment from 'moment';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { useDispatch } from 'react-redux';
  import { useSelector } from 'react-redux';
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { LoaderWindow, DropdownTextBox, BiodataTextbox, FormButton, InnerHeader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { updateBiodataStatus } from '../../../store/customerSlice';

  const CreateAccountSchema = Yup.object().shape({
    lastname: Yup.string()
        .min(2, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 25!').required('Last Name required'),
    firstname: Yup.string()
        .min(2, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 25!').required('First Name required'),
    othername: Yup.string()
        .min(2, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 25!'),
    placebirth: Yup.string()
        .min(3, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 25!'),
    emailaddress: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    phonenumber: Yup.string()
      .min(11, 'Phone number must be 11 digits')
      .max(11, 'Phone number must be 11 digits')
      .matches(/^[0-9]+$/, 'Enter valid phone')
      .required('Phone number is required'),
    streetAddress: Yup.string()
      .min(3, 'Minimum characters is 6!')
      .max(50, 'Maximum characters is 25!').required('Enter Street/Address'),
    areaLocality: Yup.string()
      .min(3, 'Minimum characters is 6!')
      .max(50, 'Maximum characters is 25!').required('Enter Area/Locality'),
  })

//Drop down Gender
const genderlist = ["Male", "Female"];

const nationalitylist = ["Nigeria", "Foreigner"];

const statesList = ["Abuja", "Abia", "Adamawa", "Akwa Ibom","Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nassarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers","Sokoto", "Taraba", "Yobe","Zamfara"]
    

const PersonalDetailsScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.customerData);

  const [isLoading, setIsLoading] = useState(false)
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState('');
  const [stateOrigin, setStateOrigin] = useState('');
  const [nationality, setNationality] = useState('')
  const [state, setState] = useState('')

  const confirmValidateAccountData = (values) => {

    setIsLoading(false);

    Alert.alert(AppName.AppName, 'Do you want to save personal details?', [
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
      customer_id: customerData.customer_ENTRY_ID,
      lastname : values.lastname,
      firstname : values.firstname,
      other_name : values.othername,
      gender : gender,
      date_of_birth : dob,
      place_of_birth : values.placebirth,
      phone_number : values.phonenumber,
      emailAddress : values.emailaddress,
      state_of_origin : stateOrigin,
      nationality : nationality,
      address :values.streetAddress,
      area_location : values.areaLocality,
      state : state
    };

    console.log(data)

    setIsLoading(true);

      axios.post(APIBaseUrl.developmentUrl + 'customer/updatePersonalData',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {

        setIsLoading(false)

        if(response.data.response.responseCode == 200) {          

          dispatch(updateBiodataStatus(1));          
          Alert.alert('Finserve', 'Your Bio-data has been saved!')
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

    //component states
    const [calendarMode, setCalendarMode] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    //show date picker
    const showDatePicker = (mode) => {
      setDatePickerVisibility(true);
      setCalendarMode(mode)
    };

    //hide date pickers
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

   // handle confirm 
   const handleConfirm = (date) => {
    setDOB(FormatDate(date))
    hideDatePicker();
  };

   // function to format to date
   const FormatDate = (data) => {

    let dateTimeString =
      data.getFullYear() +
      '-' +
      (data.getMonth() + 1) +
      '-' +  data.getDate();
  
    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };

   // Function to include date component
   function IncludeDateComponent() {
    return (
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode={calendarMode}
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
  )
}

  //USE EFFECT
  useEffect(() => {
    console.log(customerData.customer_ENTRY_ID);
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
    <InnerHeader onPress={() => navigation.goBack()} title="Personal Details" />
    <LoaderWindow loading={isLoading} />
    

  {/* FORM STARTS HERE */}
<Formik
    initialValues={{
      lastname: '',
      firstname: '',
      othername: '',
      placebirth: '',
      phonenumber: '',
      emailaddress: '',
      streetAddress: '',
      areaLocality: '',
    }}
    validationSchema={CreateAccountSchema}
    onSubmit={values => confirmValidateAccountData(values)}
    >
{({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
    <View>
                  <View style={styles.whiteBG}> 
                  <View style={styles.title}>
                  <Text style={styles.titleDesc}>Complete your bio-data details below</Text>
              </View>

              <View style={styles.formBox}>


              <View style={styles.formRow}>
              <View>
                  <BiodataTextbox 
                    label="Last Name"
                    value={values.lastname}
                    onChange={handleChange('lastname')}
                  /> 
                  {errors.lastname && 
                    <Text style={styles.errorLabel}>{errors.lastname}</Text>
                  }
              </View>
              <View>
                    <BiodataTextbox 
                    label="First Name"
                    value={values.firstname}
                    onChange={handleChange('firstname')}
                  /> 
                  {errors.firstname && 
                    <Text style={styles.errorLabel}>{errors.firstname}</Text>
                  }
              </View>
              </View>

              <View style={styles.formRow}>
              <View>
                <BiodataTextbox 
                label="Other Name"
                value={values.othername}
                onChange={handleChange('othername')}
                /> 
                {errors.othername && 
                  <Text style={styles.errorLabel}>{errors.othername}</Text>
                }
              </View>
              <DropdownTextBox 
                data={genderlist}
                label="Gender"
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem);
                }}
              />
            </View>

            <View style={styles.formRow}>
            <Pressable onPress={() => showDatePicker("date")}>
              <BiodataTextbox 
                label="Date of Birth"
                placeholder="Tap icon"
                value={dob}
                icon={icons.calender}
                onChange={(text) => setDOB(text)}
              /> 
            </Pressable>
            <View>
              <BiodataTextbox 
                label="Place of Birth"
                value={values.placebirth}
                onChange={handleChange('placebirth')}
              /> 
              {errors.placebirth && 
                <Text style={styles.errorLabel}>{errors.placebirth}</Text>
              }
            </View>
          </View>


          <View style={styles.formRow}>
          <View>
              <BiodataTextbox 
              label="Phone Number"
              maxlength={11}
              value={values.phonenumber}
              onChange={handleChange('phonenumber')}
            /> 
            {errors.phonenumber && 
              <Text style={styles.errorLabel}>{errors.phonenumber}</Text>
            }
          </View>
          <View>
            <BiodataTextbox 
            label="Email Address"
            value={values.emailaddress}
            onChange={handleChange('emailaddress')}
          /> 
          {errors.emailaddress && 
            <Text style={styles.errorLabel}>{errors.emailaddress}</Text>
          }
          </View>
        </View>

        <View style={styles.formRow}>
        <DropdownTextBox 
          data={statesList}
          label="State of Origin"
          onSelect={(selectedItem, index) => {
            setStateOrigin(selectedItem);
          }}
        />
        <DropdownTextBox 
        data={nationalitylist}
        label="Nationality"
        onSelect={(selectedItem, index) => {
          setNationality(selectedItem);
        }}
      />
      </View>

      <View style={{marginBottom: wp(3)}}>
      <BiodataTextbox 
      label="House Address/Street"
      value={values.streetAddress}
      full={true}
      onChange={handleChange('streetAddress')}
      /> 
      {errors.streetAddress && 
        <Text style={styles.errorLabel}>{errors.streetAddress}</Text>
      }
      </View>

      <View style={styles.formRow}>
      <View>
      <BiodataTextbox 
        label="Area/Locality"
        value={values.areaLocality}
        onChange={handleChange('areaLocality')}
      /> 
      {errors.areaLocality && 
        <Text style={styles.errorLabel}>{errors.areaLocality}</Text>
      }
      </View>
      <DropdownTextBox 
      data={statesList}
      label="State"
      onSelect={(selectedItem, index) => {
        setState(selectedItem);
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

       {/* Include Date Components */}
       {IncludeDateComponent()}

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  nextBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: wp(1),
    marginTop: wp(3),
    marginBottom: wp(0.7)
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
    marginVertical: wp(6)
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
        marginTop: hp(2),
        paddingBottom: wp(3)
      },
      logo: {
        marginHorizontal: wp(5),
        marginTop: hp(1)
      }
})

export default PersonalDetailsScreen;