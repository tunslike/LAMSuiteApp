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
    <SafeAreaView style={{
      flexGrow: 1,
      backgroundColor: COLORS.BackgroundGrey
    }}>
        <View><Text>tunslike</Text></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default DashboardScreen;