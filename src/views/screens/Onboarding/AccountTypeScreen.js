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
  import axios from 'axios';
  import { useDispatch, useSelector } from 'react-redux';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
  import { AccountType, FormButton, Loader } from '../../components';
  import { updateAccountType } from '../../../store/accountSlice';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AccountTypeScreen = ({navigation}) => {

  const dispatch = useDispatch();

  const fullname = useSelector((state) => state.account.fullname);
  const email = useSelector((state) => state.account.email);
  const phone = useSelector((state) => state.account.phone);
  const pinNumber = useSelector((state) => state.account.pinNumber);

  const[coyAccount, setCoyAcct] = useState(1);
  const[indAccount, setIndAcct] = useState(0);
  const [accountType, setAccountType] = useState('Scheme')
  const [isLoading, setIsLoading] = useState(false)

  const changeAccountType = (type) => {

    console.log(coyAccount + '/' + indAccount)

    if(type == 1) {

     // dispatch(updateAccountType("Scheme"))
      setIndAcct(0)
      setCoyAcct(1)
      setAccountType('Scheme')

    }else if(type == 2) {

      //dispatch(updateAccountType("Personal"))
      setCoyAcct(0)
      setIndAcct(1)
      setAccountType('Individual')
    }

    console.log(accountType)
  }

   // function to save create account 
   const submitCustomerAccount = () => {

    const data = {
      full_name : fullname,
      phoneNumber: phone,
      emailAddress: email,
      account_type: accountType,
      pinNumber : pinNumber,
      employer_profile_id: ''
    };

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

  return (
    <SafeAreaView style={{
      flexGrow: 1,
      backgroundColor: COLORS.BackgroundGrey
    }}>


    {isLoading &&
      <Loader/>
    }

      <StatusBar barStyle="dark-content" />
      <View style={styles.logo}>
            <Image source={images.appLogo} 
            style={{
                  height: wp(16), width: wp(16), borderRadius: wp(4), resizeMode: 'contain'
            }} />
      </View>


      <View style={styles.whiteBG}> 

              <View style={styles.title}>
                <Text style={styles.mainTitle}>Choose Account Type</Text>
                <Text style={styles.titleDesc}>Please select the type of account 
                you like to setup</Text>
              </View>

              <View style={styles.accountBox}>
              <AccountType 
                onPress={() => changeAccountType(1)}
                label="Company"
                description="Scheme based accounts"
                icon={icons.coy_account_type}
                type={coyAccount} />
                
              <AccountType 
                  onPress={() => changeAccountType(2)}
                  label="Individual"
                  description="Account for personal use"
                  icon={icons.user_account_type}
                  type={indAccount} />
              </View>
      </View>

      <View style={styles.btnBox}>
      <FormButton onPress={() => submitCustomerAccount()} label="Create Account" />
      </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  accountBox: {
      marginTop: wp(6)
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
    paddingBottom: wp(12)
  },
  logo: {
    marginHorizontal: wp(5),
    marginTop: hp(6)
  }
})

export default AccountTypeScreen;