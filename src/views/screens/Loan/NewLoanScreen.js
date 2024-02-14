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
  import { GreenCheckBox, BlueButton, SummaryLine, TenorCard, InnerHeader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const NewLoanScreen = ({navigation}) => {

  const [tenor, setTenor] = useState(1);

  //function to change tenor
  const changeLoanTenor = (tenor) => {
    setTenor(tenor)
  }
  //end of function
  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>
        <InnerHeader onPress={() => navigation.goBack()} 
          title="Apply for a Loan" />

        <View style={styles.midBody}>
            <Text style={styles.preTitle}>Your pre-approved amount</Text>

            <View style={styles.amountCounter}>
                <GreenCheckBox />
                <Text style={styles.textAprAmount}>50,000.00</Text>
            </View>


            <View style={styles.loanArea}>
             <Text style={styles.loanTitle}>How much do you want to take?</Text>

             <View style={styles.amountLoanCounter}>
            
             <TouchableOpacity style={styles.btnBG}>
                <Image source={icons.minus} 
                style={{
                  height: wp(5), width: wp(5), resizeMode: 'contain', tintColor: COLORS.primaryBlue
                }}
                />
             </TouchableOpacity>

             <Text style={styles.textAprAmount}>50,000.00</Text>

              <TouchableOpacity style={styles.btnBG}>
              <Image source={icons.add} 
              style={{
                height: wp(4), width: wp(4), resizeMode: 'contain', tintColor: COLORS.primaryBlue
              }}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.tenorTitle}>How long do you want to take it for?</Text>

          <View style={styles.tenor}>
              <TenorCard onPress={() => changeLoanTenor(1)} active={(tenor == 1) ? true : null} title="1 Month" />
              <TenorCard onPress={() => changeLoanTenor(2)} active={(tenor == 2) ? true : null}  title="2 Months" />
              <TenorCard onPress={() => changeLoanTenor(3)} active={(tenor == 3) ? true : null} title="3 Months" />
              <TenorCard onPress={() => changeLoanTenor(6)} active={(tenor == 6) ? true : null} title="6 Months" />
          </View>
        </View>
        <View style={styles.loanOptions}>
              <Text style={styles.txtDisburse}>Disbursement Account</Text>
              <TouchableOpacity
                style={styles.addOptionsBtn}
              >
                  <Text style={styles.optionTxt}>Add Account</Text>
             
              </TouchableOpacity>
        </View>

        <View style={styles.loanOptions_second}>
        <Text style={styles.txtDisburse}>Loan Purpose</Text>
        <TouchableOpacity
          style={styles.addOptionsBtn_second}
        >
            <Text style={styles.optionTxt}>Select here</Text>

        </TouchableOpacity>
  </View>
        </View>

     <View style={styles.loanSummary}>
      <Text style={styles.loanSummaryTxt}>Loan Summary</Text>

            <SummaryLine title="Monthly Repayment" narration="NGN 38,903.00" />
            <SummaryLine title="First Repayment Date" narration="Mon, 01 Feb 2024" />
            <SummaryLine title="Total Repayment" narration="NGN 103,343.00" />
            <SummaryLine title="Loan Interest" narration="1.75%" />

            <BlueButton onPress={() => navigation.navigate("ConfirmLoan")} label="Continue" />
     </View>   
      </ScrollView>
  )
}

export default NewLoanScreen

const styles = StyleSheet.create({
  signInBox: {
    alignSelf: 'center',
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: wp(31.3),
    paddingVertical: Platform.OS === 'ios' ? wp(3.9) : wp(3.2),
    borderRadius: wp(4),
    marginBottom: wp(3)
  },
  loanSummaryTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    color: '#160B53',
    marginBottom: wp(3)
  },
  loanSummary: {
    backgroundColor: COLORS.White,
    marginTop: wp(3),
    borderTopRightRadius: wp(8),
    borderTopLeftRadius: wp(8),
    padding: wp(4.4),
    paddingBottom: wp(8),
    marginHorizontal: wp(2)
  },
  txtDisburse: {
      color: COLORS.accountTypeDesc,
      fontFamily: FONTS.POPPINS_MEDIUM,
      fontSize: wp(3.2)
  },
  optionTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.6),
    color: COLORS.ButtonBorderBlue
  },
  addOptionsBtn: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    columnGap: wp(2),
    borderRadius: wp(4),
    borderColor: '#a7c0eb',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1)
  },

  addOptionsBtn_second: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    columnGap: wp(2),
    borderRadius: wp(4),
    borderColor: '#a7c0eb',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: wp(4),
    paddingVertical: wp(1)
  },
  loanOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp(4),
    marginHorizontal: wp(4)
  },
  loanOptions_second: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp(3),
    marginHorizontal: wp(4)
  },
  tenor: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: wp(3),
    marginTop: wp(4),
    marginBottom: wp(1)
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
    fontSize: wp(6),
    flex: 1,
    textAlign: 'center'
  },
  amountCounter: {
    backgroundColor: COLORS.tabColorActive,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp(5),
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    width: wp(50),
    alignSelf: 'center',
    marginTop: wp(5)
  },
  amountLoanCounter: {
    borderColor: COLORS.companySetupBorder,
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp(5),
    paddingVertical: wp(4.3),
    paddingHorizontal: wp(3),
    width: wp(60),
    alignSelf: 'center',
    marginTop: wp(5)
  },
  loanTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.2),
    color: COLORS.primaryBlue,
    alignSelf: 'center',
    marginTop: wp(3)
  },

  tenorTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.2),
    color: COLORS.accountTypeDesc,
    alignSelf: 'center',
    marginTop: wp(6)
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
    marginTop: wp(2.5),
    paddingBottom: wp(4)
  }
})