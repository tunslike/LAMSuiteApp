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
  import { AccountSetupButton, GreenCheckBox, FormButton } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const BillCompletionScreen = ({route, navigation}) => {

  const {billType, amount, message} = route.params;

  const formatCurrencyText = (value) => {
    return value.toLocaleString('en-US', {maximumFractionDigits:2})
  }

  return (

    <View style={{
      flexGrow: 1,
      backgroundColor: COLORS.successGreen
    }}>
    <StatusBar barStyle="light-content" />

    <View style={styles.header}>
        <Text style={styles.headerTxt}>{billType}</Text>
    </View>

    <View style={styles.whiteBG}>
        <Image source={icons.success_icons} 
          style={{
            height: wp(27), width: wp(27), resizeMode: 'contain', alignSelf: 'center', marginTop: wp(10)
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
              {message}
        </Text>

        <View style={styles.amountCounter}>
        <GreenCheckBox />
        <Text style={styles.textAprAmount}>₦ {formatCurrencyText(amount)}</Text>

    </View>

    </View>

    <View style={{marginTop: wp(13)}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Tab")}
        style={styles.loginButton}>
          <Text style={styles.loginTxtbutton}>Back to Dashboard</Text>

        </TouchableOpacity>
    </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    textAprAmount: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.textLoanAmount,
        fontSize: wp(6.5),
        flex: 1,
        textAlign: 'center',
      },
    amountCounter: {
        backgroundColor: COLORS.tabColorActive,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: wp(5),
        paddingVertical: wp(3.5),
        paddingHorizontal: wp(5),
        width: wp(55),
        alignSelf: 'center',
        marginTop: wp(5)
      },

  loginTxtbutton: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3),
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
    marginTop: hp(6),
    paddingBottom: wp(15),
    marginHorizontal: wp(5)
  },

  headerTxt: {
      fontFamily: FONTS.POPPINS_SEMIBOLD,
      color: COLORS.White,
      fontSize: wp(4),
      marginTop: wp(10),
      
  },
  header: {
    backgroundColor: COLORS.successHeader,
    paddingBottom: wp(4),
    alignItems: 'center',
    borderBottomLeftRadius: wp(8),
    borderBottomRightRadius: wp(8)

  }

})

export default BillCompletionScreen;