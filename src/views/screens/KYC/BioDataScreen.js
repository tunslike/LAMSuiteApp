import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react'
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
  ScrollView,
  Dimensions, Pressable
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context';
  import { useSelector, useDispatch } from 'react-redux';
  import {updateEmail, 
          updateFullname, 
          updatePhone, 
          updatePinNumber, 
          updateAccountType } from '../../../store/accountSlice';
  import axios from 'axios';
  import { Formik } from 'formik';
  import * as Yup from 'yup'
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
  import { DropdownTextBox, BiodataTextbox, Loader, FormButton } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  const PersonalDetailsSchema = Yup.object().shape({
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
    gender: Yup.string()
        .min(6, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 25!').required('First Name required'),
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

/*

const EmployerDetailsSchema = Yup.object().shape({
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
  gender: Yup.string()
      .min(6, 'Minimum characters is 6!')
      .max(25, 'Maximum characters is 25!').required('First Name required'),
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

const NOKDetailsSchema = Yup.object().shape({
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
  gender: Yup.string()
      .min(6, 'Minimum characters is 6!')
      .max(25, 'Maximum characters is 25!').required('First Name required'),
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

*/

//Drop down Gender
const genderlist = ["Male", "Female"];

const statesList = ["Abuja", "Abia", "Adamawa", "Akwa Ibom","Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
"Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
"Kebbi", "Kogi", "Kwara", "Lagos", "Nassarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
"Rivers","Sokoto", "Taraba", "Yobe","Zamfara"]

const relationshipList = ["Father", "Mother", "Son", "Daughter", "Brother", "Sister", "Friend"]

const BioDataScreen = ({navigation}) => {

  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState(null);

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

//function to save personal details
const SavePersonalDetails = (values) => {
  Alert.alert(values)
}
//end of function

//function to save employer details
const SaveEmployerDetails = (values) => {
  Alert.alert(values)
}
//end of function

//function to save NOK details
const SaveNOKDetails = (values) => {
  Alert.alert(values)
}
//end of function

// PERSONAL FORM COMPONENT //
const PersonalDetailsForm = () => {
  return (
    <Formik
    initialValues={{
      lastname: '',
      firstname: '',
      othername: '',
    }}
    validationSchema={PersonalDetailsSchema}
    onSubmit={values => console.log('nothing is working herr')}
    >
    {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
    <View>
          {/* START PERSONAL DETAILS */}
                  <View style={styles.whiteBG}> 
                  <View style={styles.title}>
                      <Text style={styles.mainTitle}>Personal Details</Text>
                      <Text style={styles.titleDesc}>Complete the details below to update your bio-data</Text>
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
                  />
                </View>
    
                <View style={styles.formRow}>
                <Pressable onPress={() => showDatePicker("date")}>
                  <BiodataTextbox 
                    label="Date of Birth"
                    value={dob}
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
          />
            <BiodataTextbox 
              label="Nationality"
              value={values.nationality}
              onChange={handleChange('nationality')}
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
        />
        </View> 
      </View>
    
              </View>
              <View style={styles.btnBox}>
              <FormButton onPress={handleSubmit} label="Save Personal Data" />
              </View>
    
    </View>
    )}
    </Formik>
  )
}
// END OF PERSONAL FORM COMPONENT //

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
        
        {/* Include Date Components */}
        {IncludeDateComponent()}

        <View style={styles.logo}>
        <Image source={images.appLogo} 
        style={{
              height: wp(16), width: wp(16), borderRadius: wp(4), resizeMode: 'contain'
        }} />
        </View>


        {/* PERSONAL FORM ENDS HERE ********************* */}
        {PersonalDetailsForm()}
        {/* PERSONAL FORM ENDS HERE ********************* */}


{/**********************  EMPLOYER FORM STARTS HERE ********************* */}
{/** 
<Formik
initialValues={{
  emp_name: '',
  emp_address: '',
  emp_locality: '',
  emp_state: '',
  emp_sector: '',
  grade_level: '',
  serviceLength: '',
  idnumber: '',
  salarydate: '',
  annualSalary: '',
}}
validationSchema={EmployerDetailsSchema}
onSubmit={values => validateAccountData(values)}
>
{({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
<View>
<View style={styles.whiteBG}> 

  <View style={styles.title}>
  <Text style={styles.mainTitle}>Employer Details</Text>
  <Text style={styles.titleDesc}>Complete the details below to update your employer details</Text>

  <View style={{marginTop: wp(4), marginBottom: wp(3)}}>
      <BiodataTextbox 
      label="Employer Name"
      value={values.email}
      full={true}
      onChange={handleChange('email')}
      /> 
  </View>

  <View style={{marginBottom: wp(3)}}>
    <BiodataTextbox 
    label="Office Addresss"
    value={values.email}
    full={true}
    onChange={handleChange('email')}
    /> 
  </View>

  <View style={styles.formRow}>
  <BiodataTextbox 
    label="Area/Locality"
    value={values.email}
    onChange={handleChange('email')}
  /> 
  <DropdownTextBox 
  data={statesList}
  label="State"
/>
</View>

<View style={styles.formRow}>
<BiodataTextbox 
  label="Sector"
  value={values.email}
  onChange={handleChange('email')}
/> 
<BiodataTextbox 
  label="Grade Level"
  value={values.email}
  onChange={handleChange('email')}
/> 
</View>

<View style={styles.formRow}>
<BiodataTextbox 
label="Length of Service"
value={values.email}
onChange={handleChange('email')}
/> 
<BiodataTextbox 
label="Staff ID Number"
value={values.email}
onChange={handleChange('email')}
/> 
</View>

<View style={styles.formRow}>
<BiodataTextbox 
label="Salary Payment Date"
value={values.email}
onChange={handleChange('email')}
/> 
<BiodataTextbox 
label="Annual Salary"
value={values.email}
onChange={handleChange('email')}
/> 
</View>

</View>
  </View>

  <View style={styles.btnBox}>
  <FormButton onPress={handleSubmit} label="Save Employer Data" />
  </View>

</View>
)}

</Formik>
*/}
{/**********************  EMPLOYER FORM ENDS HERE ********************* */}


{/********************* NOK FORM STARTS HERE ********************* */}
{/**
<Formik
initialValues={{
  nok_lastname: '',
  nok_firstname: '',
  nok_gender: '',
  nok_rel: '',
  nok_phone: '',
  nok_email: '',
  nok_address: '',
  nok_locality: '',
  nok_state: ''
}}
validationSchema={NOKDetailsSchema}
onSubmit={values => validateAccountData(values)}
>
{({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
  <View>
  <View style={styles.whiteBG}> 

  <View style={styles.title}>
  <Text style={styles.mainTitle}>Next of Kin Details</Text>
  <Text style={styles.titleDesc}>Complete the details below to update your NOK details</Text>
  
  
  <View style={[styles.formRow, {marginTop: wp(4)}]}>
  <BiodataTextbox 
    label="First Name"
    value={values.email}
    onChange={handleChange('email')}
  /> 
  <BiodataTextbox 
    label="Last Name"
    value={values.email}
    onChange={handleChange('email')}
  /> 
  </View>
  
  <View style={styles.formRow}>
  <DropdownTextBox 
  data={gender}
  label="Gender"
  />
  <DropdownTextBox 
  data={relationshipList}
  label="Relationship"
  />
  </View>
  
  <View style={styles.formRow}>
  <BiodataTextbox 
  label="Phone Number"
  value={values.email}
  onChange={handleChange('email')}
  /> 
  <BiodataTextbox 
  label="Email Address"
  value={values.email}
  onChange={handleChange('email')}
  /> 
  </View>
  
  <View style={{marginBottom: wp(3)}}>
    <BiodataTextbox 
    label="House Address / Street"
    value={values.email}
    full={true}
    onChange={handleChange('email')}
    /> 
  </View>
  
  <View style={styles.formRow}>
  <BiodataTextbox 
    label="Area/Locality"
    value={values.email}
    onChange={handleChange('email')}
  /> 
  <DropdownTextBox 
  data={statesList}
  label="State"
  />
  </View>
  
  </View>
  </View>
  
  <View style={styles.btnBox}>
  <FormButton onPress={handleSubmit} label="Save NOK Data" />
  </View>
  </View>
)}
</Formik>
*/}
{/**********************  NOK FORM ENDS HERE ********************* */}

        </SafeAreaView>

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  errorLabel: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.7),
    color: COLORS.primaryRed,
    marginLeft: wp(3.5),
    marginTop: wp(2)
  },
  formErrortext: {
    fontFamily: FONTS.POPPINS_LIGHT,
    fontSize: wp(2.8),
    marginTop: wp(2),
    marginLeft: wp(6),
    color: COLORS.primaryRed,
    fontWeight: '300',
  },
  btnBox: {
      marginVertical: wp(6)
},
  formRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: wp(2),
    alignItems: 'center',
    marginBottom: wp(3)
  },
    titleDesc: {
        marginTop: wp(3),
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3),
        width: wp(70),
        lineHeight: wp(5),
        color: COLORS.disablePrimaryBlue,
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
        borderRadius: wp(5),
        marginHorizontal: wp(2.9),
        marginTop: hp(3),
        paddingBottom: wp(3)
      },
      logo: {
        marginHorizontal: wp(5),
        marginTop: hp(1)
      }
})
export default BioDataScreen