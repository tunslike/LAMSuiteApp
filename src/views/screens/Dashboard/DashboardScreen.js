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
  import { AccountCard, ServiceCard, GreenCheckBox, TransactionCard, Loader, CreditRating } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DashboardScreen = ({navigation}) => {
  return (
    <ScrollView style={{
      flexGrow: 1,
      backgroundColor: COLORS.BackgroundGrey
    }}>

    <View style={styles.header}>
          <View style={styles.logoArea}>
                <Image source={images.appLogo} 
                  style={{
                    height: wp(13), width: wp(13), borderRadius: wp(4), resizeMode: 'contain'
                  }}
                />
                <View>
                    <Text style={styles.titleHeader}>Hello, Babatunde</Text>
                    <Text style={styles.titleGreeting}>Good morning</Text>
                </View>
          </View>
          <View style={styles.tabAreas}>
               <CreditRating rating={1} />
                <TouchableOpacity style={styles.bellBG}>
                    <Image source={icons.notification} 
                      style={{
                        height: wp(4.5), width: wp(4.5), resizeMode: 'contain', tintColor: COLORS.primaryBlue
                      }}
                    />
                </TouchableOpacity>
          </View>
    </View>

        <View style={styles.dashboardArea}>

            <AccountCard />
        </View>

        <TouchableOpacity 
                    onPress={() => navigation.navigate("NewLoan")}
        style={styles.apprvLoan}>
           
            <GreenCheckBox />
        
               <Text style={styles.txtApprove}>You have been pre-approved to get a loan of: </Text>
            
               <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
               <Text style={styles.curSign}>₦</Text>
               <Text style={styles.loanAmount}>50,000.00</Text>
               </View>
              
            
            
        </TouchableOpacity>

        <View style={styles.serviceList}>

                <ServiceCard 
                  image={images.new_loan_bg}
                  label="New Loan"
                  icon={icons.loan}
                  iconStyle={{
                    tintColor: '#0E936E' 
                  }}
                  textStyles={{
                    color: '#155345'
                  }}
                />

                <ServiceCard 
                  image={images.repay_loan_bg}
                  label="Repayment"
                  icon={icons.repayment}
                  iconStyle={{
                    tintColor: '#1D2D66' 
                  }}
                  textStyles={{
                    color: '#142665'
                  }}
                />

                <ServiceCard 
                  image={images.buy_airtime_bg}
                  label="Buy Airtime"
                  icon={icons.airtime}
                  iconStyle={{
                    tintColor: '#7C1D10' 
                  }}
                  textStyles={{
                    color: '#3E1913'
                  }}
                />

                <ServiceCard 
                  image={images.buy_data_bg}
                  label="Buy Data"
                  icon={icons.data}
                  iconStyle={{
                    tintColor: '#964A05' 
                  }}
                  textStyles={{
                    color: '#5A3900'
                  }}
                />

        </View>


        <View style={styles.transWindow}>

                  <View style={styles.transHdr}>
                    <Text style={styles.hdrTxt}>Recent Transactions</Text>
                    <TouchableOpacity style={styles.viewAllbtn}>
                      <Text style={styles.viewTxt}>View All</Text>
                    </TouchableOpacity>
                  </View>
                <View style={styles.transactionList}>
                      <TransactionCard
                        icon={icons.airtime}
                        amount="10,000"
                        type={1}
                        date="01-Jan-2024"
                        narration="Airtime MTN Recharge"
                      />

                      <TransactionCard
                      icon={icons.data}
                      amount="10,000"
                      type={1}
                      date="01-Jan-2024"
                      narration="Airtime MTN Recharge"
                    />

                    <TransactionCard
                    icon={icons.airtime}
                    amount="10,000"
                    type={1}
                    date="01-Jan-2024"
                    narration="Airtime MTN Recharge"
                  />

                  <TransactionCard
                  icon={icons.airtime}
                  amount="10,000"
                  type={1}
                  date="01-Jan-2024"
                  narration="Airtime MTN Recharge"
                />
                </View>
        </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  transactionList: {
    marginVertical: wp(5)
  },
  viewTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.primaryRed,
    fontSize: wp(2.7)
  },
  viewAllbtn: {
      borderColor: COLORS.primaryRed,
      borderWidth: 1,
      borderStyle: 'solid',
      padding: wp(1),
      paddingHorizontal: wp(2),
      borderRadius: wp(5)
  },
  hdrTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    color: COLORS.primaryBlue
  },
  transHdr: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  transWindow: {
    backgroundColor: COLORS.White,
    marginTop: wp(3),
    borderTopRightRadius: wp(8),
    borderTopLeftRadius: wp(8),
    padding: wp(6),
    paddingBottom: wp(8)
  },
  serviceList: {
    marginHorizontal:wp(3),
    marginVertical: wp(5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: wp(3.5),
    flexWrap: 'wrap',
    rowGap: wp(3.5)
  },
  curSign: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(4),
    color: COLORS.LandingGreyText,
    marginRight:wp(1)
  },
  loanAmount: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(5.3),
    color: COLORS.primaryRed
  },
  txtApprove: {
    flex: 1,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(2.8),
    marginHorizontal: wp(3)
  },
  checkedGreen: {
      backgroundColor: COLORS.checkedColorGreen,
      borderRadius: wp(5),
      height: wp(8),
      width: wp(8),
  },
  apprvLoan: {
    marginTop: wp(3),
    backgroundColor: COLORS.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp(5),
    padding: wp(3),
    marginHorizontal: wp(3)
  },
  services: {
    marginTop: wp(2),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  dashboardArea: {
    marginTop: wp(3),
    marginHorizontal: wp(2)
  },
  tabAreas: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(3)
  },
  bellBG: {
    backgroundColor: COLORS.notificationBG,
    padding: wp(1.5),
    borderRadius: wp(2.8)
  },
  titleHeader: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.primaryRed,
    fontSize: wp(3.7)
  },
  titleGreeting: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.TextColorGrey,
    fontSize: wp(3.3)
  },
  logoArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(2)
  },
  header: {
    backgroundColor: COLORS.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: wp(8),
    borderBottomRightRadius: wp(8),
    paddingTop:wp(17),
    paddingBottom: wp(5),
    paddingHorizontal: wp(3)
  }
})

export default DashboardScreen;