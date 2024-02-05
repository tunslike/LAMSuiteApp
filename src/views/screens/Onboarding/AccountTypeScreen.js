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
  import { OtpInput } from 'react-native-otp-entry';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { AccountType, FormButton } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AccountTypeScreen = ({navigation}) => {

  const[coyAccount, setCoyAcct] = useState(1);
  const[indAccount, setIndAcct] = useState(0);



  const changeAccountType = (type) => {

    console.log(coyAccount + '/' + indAccount)

    if(type == 1) {
      setIndAcct(0)
      setCoyAcct(1)
    }else if(type == 2) {
      setCoyAcct(0)
      setIndAcct(1)
    }
  }

  return (
    <SafeAreaView style={{
      flexGrow: 1,
      backgroundColor: COLORS.BackgroundGrey
    }}>

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
      <FormButton onPress={() => navigation.navigate("AccountSetup")} label="Confirm Account Type" />
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