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
  import TextLink from 'react-native-text-link';
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import { COLORS, images, FONTS, AppName, APIBaseUrl, icons } from '../../../constants';
  import { Loader, DropdownTextBox, BiodataTextbox, FormButton, RedCheckBox } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  const CreateAccountSchema = Yup.object().shape({
    gradelevel: Yup.string()
        .min(2, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 25!').required('Enter grade level or position'),
    servicelength: Yup.string()
        .min(1, 'Minimum characters is 1!')
        .max(25, 'Maximum characters is 3!')
        .matches(/^[0-9]+$/, 'Enter number value!').required('Enter service length'),
    idnumber: Yup.string()
        .min(3, 'Minimum characters is 3!')
        .max(25, 'Maximum characters is 25!').required('Enter Staff ID number'),
    salarydate: Yup.string()
    .min(3, 'Minimum characters is 6!')
    .max(25, 'Maximum characters is 25!').required('Enter Salary date'),
    annualsalary: Yup.string()
      .max(11, 'Amount exceeded!')
      .matches(/^[0-9]+$/, 'Enter number value!')
      .required('Enter annual salary!'),
  })

const EmployerDetailsScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const customerID = useSelector((state) => state.account.customerEntryID);
  const employerProfileID = useSelector((state) => state.account.employerProfileID);

  const sectorList = ["Private", "Public", "Government"];

  const [sector, setSector] = useState('');

  const confirmValidateAccountData = (values) => {

    setIsLoading(false);

    Alert.alert(AppName.AppName, 'Do you want to save employer details?', [
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
      customerID : customerID,
      employerProfileID: employerProfileID,
      sector: sector,
      grade_level: values.gradelevel,
      service_length: values.servicelength,
      staff_id_number: values.idnumber,
      salary_payment_date : values.salarydate,
      annual_salary: values.annualsalary
    };

    setIsLoading(true);

      axios.post(APIBaseUrl.developmentUrl + 'customer/updateEmployerData',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {

        setIsLoading(false)

        if(response.data.response.responseCode == 200) {

          //update customer entry ID
          navigation.navigate("NOKDetails");

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

      {isLoading &&
        <Loader title="Processing your request, please wait..." />
      }

      <View style={{flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingRight: wp(4)}}>
      <View style={styles.logo}>
      <Image source={images.appLogo} 
      style={{
            height: wp(16), width: wp(16), borderRadius: wp(4), resizeMode: 'contain'
      }} />
</View>
<View>
<View style={styles.nextBody}>
<Image source={icons.arrow_next} 
    style={{
      height: wp(4.1), width: wp(4.1), resizeMode: 'contain', tintColor: COLORS.primaryRed
    }}
/>
<Text style={styles.nextStep}>Next of Kin Details</Text>
</View>
<Text style={styles.completeStatus}>Completed 2 of 3</Text>
</View>
      </View>
    

  {/* FORM STARTS HERE */}
<Formik
    initialValues={{
      gradelevel: '',
      servicelength: '',
      idnumber: '',
      salarydate: '',
      annualsalary: '',
    }}
    validationSchema={CreateAccountSchema}
    onSubmit={values => confirmValidateAccountData(values)}
    >
{({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
    <View>
                  <View style={styles.whiteBG}> 
                  <View style={styles.title}>
                  <Text style={styles.mainTitle}>Employer Details</Text>
                  <Text style={styles.titleDesc}>Complete the details below to update your employer details</Text>
              </View>

              <View style={styles.formBox}>

      
        <View style={styles.formRow}>
            <DropdownTextBox 
              data={sectorList}
              label="Sector"
              onSelect={(selectedItem, index) => {
                setSector(selectedItem);
              }}
            />
            <View>
            <BiodataTextbox 
            label="Grade Level/Position"
            value={values.gradelevel}
            onChange={handleChange('gradelevel')}
          /> 
          {errors.gradelevel && 
            <Text style={styles.errorLabel}>{errors.gradelevel}</Text>
          }
            </View>
        </View>
        
        <View style={styles.formRow}>
        <View>
          <BiodataTextbox 
          label="Length of Service"
          value={values.servicelength}
          onChange={handleChange('servicelength')}
          /> 
          {errors.servicelength && 
            <Text style={styles.errorLabel}>{errors.servicelength}</Text>
          }
        </View>
        <View>
        <BiodataTextbox 
        label="Staff ID Number"
        value={values.idnumber}
        onChange={handleChange('idnumber')}
        /> 
        {errors.idnumber && 
          <Text style={styles.errorLabel}>{errors.idnumber}</Text>
        }
        </View>
        </View>
        
        <View style={styles.formRow}>
        <View>
          <BiodataTextbox 
          label="Salary Payment Date"
          value={values.salarydate}
          onChange={handleChange('salarydate')}
          /> 
          {errors.salarydate && 
            <Text style={styles.errorLabel}>{errors.salarydate}</Text>
          }
        </View>
        <View>
        <BiodataTextbox 
        label="Annual Salary"
        value={values.annualsalary}
        onChange={handleChange('annualsalary')}
        /> 
        {errors.annualsalary && 
          <Text style={styles.errorLabel}>{errors.annualsalary}</Text>
        }
        </View>
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

    </SafeAreaView>
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
    marginVertical: wp(10)
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
        padding: wp(4),
        borderRadius: wp(5),
        marginHorizontal: wp(2.9),
        marginTop: hp(3),
        paddingBottom: wp(9)
      },
      logo: {
        marginHorizontal: wp(5),
        marginTop: hp(1)
      }
})

export default EmployerDetailsScreen;