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
  Dimensions} from 'react-native';
  import BottomSheet from '@gorhom/bottom-sheet';
  import { useSelector, useDispatch } from 'react-redux';
  import {updateEmployerProfileID} from '../../../store/accountSlice';
  import axios from 'axios';
  import { SelectList } from 'react-native-dropdown-select-list'
  import { COLORS, images, FONTS, icons, APIBaseUrl, AppName } from '../../../constants';
  import { AccountSetupButton, Loader, FormButton } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AccountSetupScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const fullname = useSelector((state) => state.account.fullname);
    const email = useSelector((state) => state.account.email);
    const phone = useSelector((state) => state.account.phone);
    const pinNumber = useSelector((state) => state.account.pinNumber);
    const account_type = useSelector((state) => state.account.account_type);
    const bioDataComplete = useSelector((state) => state.account.completedBioData);

    const BottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const [toggleBtn, setToggleBtn] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [profileData, setProfileData] = useState('');
    const [selected, setSelected] = React.useState(null);

    //callbacks
    const handleSheetChange = useCallback((index) => {
        console.log(index)
    }, []);

    const handleOpenPress = () => BottomSheetRef.current?.snapToIndex(0);

    // function to toggle button
    const toggleSkipButton = () => {
        if(toggleBtn == 0) {
          setToggleBtn(1)
        }else if(toggleBtn == 1) {
          setToggleBtn(0)
        }
    }
    // end of function

    // function to set employer profile ID
    const SaveEmployerProfileID = (value) => {
    
        dispatch(updateEmployerProfileID(value));
        setSelected(value)
    }
    // end of function

    // function to save create account 
    const submitCustomerAccount = () => {

      const data = {
        full_name : fullname,
        phoneNumber: phone,
        emailAddress: email,
        account_type: account_type,
        pinNumber : pinNumber,
        employer_profile_id: selected
      };

      console.log(data)

      return;

      setIsLoading(true);

      axios.post(APIBaseUrl.developmentUrl + 'customer/newCustomer',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {

        setIsLoading(false)

        console.log(response)

        if(response.data.responseCode == 200) {

          navigation.navigate("AccountCreated");

        }else{

          Alert.alert('Oops! Unable to process your request, please try again')

        }

      })
      .catch(error => {
        console.log(error);
      });

    }
    // end function 

    // function to fetch employer profile
    const fetchEmployerProfile = () => {

            //show loader
          setIsLoading(true);

          axios.get(APIBaseUrl.developmentUrl + 'customer/getEmployerProfiles',{},{
            headers: {
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:8082'
            }
          })
          .then(response => {

            let data = response.data.map((item) => {
              return {key: item.profile_ID, value: item.company_NAME}
            })

            setIsLoading(false)
            setProfileData(data)

          })
          .catch(error => {
            console.log(error);
          });
    }// end of function

    // check if employer is selected
    const CheckEmployerSelected = (kyc_type) => {
        if(!selected) {
          Alert.alert(AppName.AppName, 'Please select your employer to proceed!')
          return;
        }

        if(kyc_type == 'biodata') {

          navigation.navigate("PersonalDetails");
          return;

        }else if(kyc_type == 'document') {

          navigation.navigate("DocumentUpload")
          return;

        }
    }
    // end of function

    //USE EFFECT
    useEffect(() => {

      //fetch providers
      fetchEmployerProfile();

  }, []);

  return (
    
    <ScrollView style={styles.container}>
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

    <View style={styles.whiteBG}> 

        <View style={styles.title}>
        <Text style={styles.mainTitle}>Scheme Account Setup</Text>
        <Text style={styles.titleDesc}>Please complete the details below to 
        activate your company account setup</Text>
      </View>

      <View style={styles.dropBox}>
      {/** 
      <TouchableOpacity
        onPress={handleOpenPress}
      style={styles.dropDown}>
        <Image source={icons.coy_account_type} 
          style={{
            height: wp(4), width: wp(4), marginBottom: wp(1),
            tintColor: COLORS.TextColorGrey, resizeMode: 'contain'
          }}
        />
        <Text style={styles.dropTxt}>Select Company or Employer name</Text>
      </TouchableOpacity>
      */}

      <SelectList 
      placeholder="Select employer or company name"
      searchPlaceholder="Select or search..."
      setSelected={(val) => SaveEmployerProfileID(val)} 
      data={profileData} 
      fontFamily={FONTS.POPPINS_REGULAR}
      save="key"
      boxStyles={styles.dropDown}
      dropdownStyles={{
        fontFamily: FONTS.POPPINS_REGULAR,
        borderColor: COLORS.companySetupBorder,
        borderWidth: 1,
        borderStyle: 'solid',
        fontSize: wp(3.3),
      }}
      dropdownTextStyles={{
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.3),
        color: COLORS.TextColorGrey
      }}
      inputStyles={{
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.5),
        color: COLORS.TextColorGrey
      }}
  />

  </View>

  <View style={styles.kycBox}>
  <Text style={styles.kycHeader}>PROVIDE KYC DETAILS</Text>

  <AccountSetupButton 
      label="Bio-Data Update"
      onPress={() => (bioDataComplete == 'completed') ? null : CheckEmployerSelected('biodata')}
      icon={icons.profile}
      completed={(bioDataComplete == 'completed') ? true : null}
  />

  <AccountSetupButton 
      label="Upload Documents"
      onPress={() => CheckEmployerSelected('document')}
      icon={icons.docUpload}
  />
</View>

<TouchableOpacity 
onPress={() => toggleSkipButton()}
style={styles.skipSetup}>
        
<View style={(toggleBtn == 1) ? styles.checkBox_checked : styles.checkBox_notchecked}>
    <Image source={icons.check} 
      style={{
        height: (toggleBtn == 1) ? wp(5) : wp(4.5), width: (toggleBtn == 1) ? wp(5) : wp(4.5), resizeMode: 'contain', tintColor: COLORS.White
      }}
    />
</View>
<Text style={styles.skipText}>I will skip account setup and do this later!</Text>

</TouchableOpacity>

    </View>

    <View style={styles.btnBox}>
    <FormButton 
      disable={(toggleBtn == 0) ? true : false}
      onPress={() => submitCustomerAccount()} 
      label="Complete Setup" />
    </View>

{/** 
    <BottomSheet
      ref={BottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
    >
      <View style={styles.contentContainer}>
          <View style={styles.sheetHdr}>
              <Text style={styles.sheetHeader}>Select Employer List here</Text>
          </View>
       
      </View>
    </BottomSheet>*/}
  </ScrollView>

  )
}

const styles = StyleSheet.create({
  checkBox_checked: {
    backgroundColor: COLORS.primaryRed,
    borderRadius: wp(1.5),
    marginLeft: wp(1.5)
  },
  checkBox_notchecked: {
    borderColor: COLORS.TextBoxBorderGrey,
    borderRadius: wp(1.5),
    borderWidth: 1,
    borderStyle: 'solid',
    marginLeft: wp(1.5)
  },
  skipText: {
    color: COLORS.TextColorGrey,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.1)
  },
  skipSetup: {
    marginTop: wp(2),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(3)
  },
  sheetHdr: {
    backgroundColor: COLORS.ButtonBgGrey,
    paddingHorizontal: wp(6),
    borderRadius: wp(3),
    paddingVertical: wp(1)
  },
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: COLORS.BackgroundGrey
  },
  sheetHeader : {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3),
    color: COLORS.primaryBlue
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  dropBottomList: {
    flex: 1,
  },
  dropDown: {
    borderRadius: wp(4),
    borderColor: COLORS.companySetupBorder,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: wp(3),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(3)
  },
  dropTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.TextColorGrey
  },
  btnBox: {
    marginTop: wp(10)
  },
  dropBox: {
    marginBottom: wp(7)
  },
  kycBox: {
      paddingTop: wp(2)
  },
  kycHeader: {
    color: COLORS.TextColorGrey,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    marginBottom: wp(2)
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
    marginTop: hp(6),
    paddingBottom: wp(8)
  },
  logo: {
    marginTop: hp(6)
  }

})

export default AccountSetupScreen;