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
  ScrollView,
  Dimensions} from 'react-native';
  import { Formik } from 'formik';
  import * as Yup from 'yup'
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { GreenCheckBox, BreakdownEntry, RedCheckBox, BlueButton, SummaryLine, TenorCard, InnerHeader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const LoanConfirmationScreen = ({navigation}) => {
  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>

      <InnerHeader onPress={() => navigation.goBack()} title="Loan Confirmation" />

      <View style={styles.info}>
        <Text style={styles.infoText}>You are almost done! Please confirm your loan details</Text>
      </View>

      <View style={styles.midBody}>
      <Text style={styles.preTitle}>Your pre-approved amount</Text>

      <View style={styles.amountCounter}>
          <GreenCheckBox />
          <Text style={styles.textAprAmount}>50,000.00</Text>
      </View>


      <TouchableOpacity style={styles.offerLetter}>
            <Image source={icons.sign} 
                style={{
                    height: wp(4), width: wp(4), resizeMode: 'contain', tintColor: COLORS.primaryRed
                }}
            />
            <Text style={styles.txtOffer}>View Offer Letter</Text>
      </TouchableOpacity>

      <View style={styles.loanBreakdown}>
      
            <BreakdownEntry header1="Monthly Repayment" header2="Loan Tenor" desc1="NGN 38,903.00" desc2="6 Months" />
            <BreakdownEntry header1="Total Repayment" header2="Interest Rate" desc1="NGN 38,903.00" desc2="6 Months" />
            <BreakdownEntry header1="First Repayment Date" desc1="Mon, 01 Feb 2024" />
      </View>

      <View style={styles.secondSummary}>
      <View style={{marginHorizontal: wp(7)}}>
      <BreakdownEntry 
            header1="Disbursement Account" 
            header2="Loan Purpose" 
            desc1="GTB Bank | 1*******9203" 
            desc2="House Rent" 
            descStyle={{
                color: COLORS.ButtonBorderBlue
            }}/>
            <View>
            <RedCheckBox textLabel="By applying I agree to the loan terms and conditions" />
            <RedCheckBox textLabel="Your loan facility is powered by finserve loan scheme, and thereby you are agreeing to the terms of the loan" />
            </View>
      </View>

      </View>
      </View>

      <TouchableOpacity
            onPress={() => navigation.navigate("LoanCompleted")}
            style={styles.continueBtn}>
                <Text style={styles.continueBtnTxt}>I am ready to receive the cash</Text>
                <Image source={icons.arrow_thick} 
                style={{
                    height:wp(4), width: wp(4), marginLeft: wp(3), resizeMode: 'contain', tintColor: COLORS.White
                }}/>
  </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    offerLetter: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: wp(3),
        columnGap: wp(1)
    },
    txtOffer: {
     fontFamily: FONTS.POPPINS_MEDIUM,
     color: COLORS.primaryRed,
     fontSize: wp(3),
    },
    continueBtnTxt: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(3.5),
        color: COLORS.White,
      },
      continueBtn: {
        marginTop: wp(5),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlue,
        paddingHorizontal: wp(9),
        paddingVertical: wp(3.5),
        borderRadius: wp(4),
        marginBottom: wp(3),
      },
    secondSummary: {
        borderTopColor: COLORS.BackgroundGrey,
        borderTopWidth: 1,
        borderStyle: 'solid',
        paddingTop: wp(6)
    },
    loanBreakdown: {
        marginTop: wp(7),
        marginHorizontal: wp(3),
        paddingHorizontal: wp(4)
    },
    btnBG: {
        backgroundColor: COLORS.notificationBG,
        padding: wp(2),
        borderRadius: wp(2.8)
      },
      loanArea: {
          borderTopColor: COLORS.BackgroundGrey,
          borderTopWidth: 1,
          borderBottomColor: COLORS.BackgroundGrey,
          borderBottomWidth: 1,
          borderStyle: 'solid',
          paddingBottom: wp(4),
          paddingTop: wp(1),
          marginTop: wp(6)
      },
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
    preTitle: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3),
        color: COLORS.primaryRed,
        alignSelf: 'center',
        marginTop: wp(4)
      },
    midBody: {
        borderRadius: wp(8),
        marginHorizontal: wp(2),
        backgroundColor: COLORS.White,
        paddingBottom: wp(4)
      },
    infoText: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(3.2),
        color: COLORS.accountTypeDesc,
        textAlign: 'center',
        width: wp(50)
    },
    info: {
        marginVertical: wp(6),
        alignItems:'center'
    }
})

export default LoanConfirmationScreen