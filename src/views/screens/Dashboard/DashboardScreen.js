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
  import { OnboardingTextBox, Loader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DashboardScreen = () => {
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
                <View style={styles.creditStatus}>
                  <Image source={icons.star} 
                    style={{
                      height: wp(4), width: wp(4), resizeMode: 'contain', tintColor: COLORS.TextColorGrey
                    }}
                  />
                  <Text style={styles.creditTxt}>Bronze</Text>
                </View>
                <TouchableOpacity style={styles.bellBG}>
                    <Image source={icons.notification} 
                      style={{
                        height: wp(4.5), width: wp(4.5), resizeMode: 'contain', tintColor: COLORS.primaryBlue
                      }}
                    />
                </TouchableOpacity>
          </View>
    </View>

        <View><Text>tunslike</Text></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  creditTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.TextColorGrey,
    fontSize: wp(3)
  },
  creditStatus: {
      borderWidth: 1,
      borderStyle: 'solid',
      padding: wp(1.5),
      borderColor: COLORS.BackgroundGrey,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: wp(5),
      columnGap: 3
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
    paddingBottom: wp(7),
    paddingHorizontal: wp(3)
  }
})

export default DashboardScreen;