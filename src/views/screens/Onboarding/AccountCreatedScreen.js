import React, {useState, useRef, useMemo, useCallback} from 'react'
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
  import BottomSheet from '@gorhom/bottom-sheet';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { AccountSetupButton, FormButton } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AccountCreatedScreen = ({navigation}) => {

  return (

    <View style={{
      flexGrow: 1,
      backgroundColor: COLORS.successGreen
    }}>
    <StatusBar barStyle="light-content" />

    <View style={styles.header}>
        <Text style={styles.headerTxt}>Account Setup</Text>
    </View>

    <View style={styles.whiteBG}>
        <Image source={icons.success_icons} 
          style={{
            height: wp(25), width: wp(25), resizeMode: 'contain', alignSelf: 'center', marginTop: wp(13)
          }}
        />
        <Text style={{
          fontFamily: FONTS.POPPINS_SEMIBOLD,
          textAlign: 'center',
          color: COLORS.primaryBlue,
          marginTop: wp(10),
          fontSize: wp(4),
          lineHeight: wp(7)
        }}>
            Congratulations! Your account has been created successfully
        </Text>

        <Text style={styles.headerDesc}>
            Please check your email for further details on your account setup. Or you can login into your account below
        </Text>
    </View>

    <View style={{marginTop: wp(13)}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Login")}
        style={styles.loginButton}>
          <Text style={styles.loginTxtbutton}>Login to your account</Text>

          <Image source={icons.arrow_thick} 
            style={{
              width: wp(4), height: wp(4), resizeMode: 'contain', tintColor: COLORS.White
            }}
          />
        </TouchableOpacity>
    </View>
    
    </View>
  )
}

const styles = StyleSheet.create({

  loginTxtbutton: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    color: COLORS.White,
    marginRight: wp(3),
  },
   loginButton : {
    backgroundColor: COLORS.successHeader,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: wp(3.5),
    paddingVertical: Platform.OS === 'ios' ? wp(3.8) : wp(3),
    marginBottom: wp(3),
    paddingHorizontal: wp(15)
   },
  headerDesc: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.accountTypeDesc,
    fontSize: wp(3.2),
    marginTop: wp(7),
    textAlign: 'center'

  },
  headerTxt: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(2),
  },
  whiteBG: {
    backgroundColor: COLORS.White,
    padding: wp(6),
    borderRadius: wp(7),
    marginTop: hp(9),
    paddingBottom: wp(15),
    marginHorizontal: wp(5)
  },

  headerTxt: {
      fontFamily: FONTS.POPPINS_SEMIBOLD,
      color: COLORS.White,
      fontSize: wp(5),
      marginTop: wp(13),
      
  },
  header: {
    backgroundColor: COLORS.successHeader,
    padding: wp(6),
    alignItems: 'center',
    borderBottomLeftRadius: wp(8),
    borderBottomRightRadius: wp(8)

  }

})

export default AccountCreatedScreen;