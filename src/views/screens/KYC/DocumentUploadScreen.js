import React, {useState, useEffect} from 'react'
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
  import {updateEmail, 
          updateFullname, 
          updatePhone, 
          updatePinNumber, 
          updateAccountType } from '../../../store/accountSlice';
  import axios from 'axios';
  import { SelectList } from 'react-native-dropdown-select-list'
  import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
  import { AccountSetupButton, Loader, FormButton } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DocumentUploadScreen = () => {

  //USE EFFECT
  useEffect(() => {
     
  }, []);

  return (
    <ScrollView style={styles.container}>
    <StatusBar barStyle="dark-content" />


    <View style={styles.logo}>
    <Image source={images.appLogo} 
    style={{
          height: wp(16), width: wp(16), borderRadius: wp(4), resizeMode: 'contain'
    }} />
    </View>

      <View style={styles.whiteBG}> 

      <View style={styles.title}>
      <Text style={styles.mainTitle}>Upload KYC Documents</Text>
      <Text style={styles.titleDesc}>Tap below to upload each of the documents</Text>
    </View>


  <AccountSetupButton 
  label="Proof of Address"
  onPress={() => CheckEmployerSelected('document')}
  icon={icons.docUpload}
/>

<AccountSetupButton 
label="Means of Identification"
onPress={() => CheckEmployerSelected('document')}
icon={icons.docUpload}
/>

<AccountSetupButton 
label="Work ID Card"
onPress={() => CheckEmployerSelected('document')}
icon={icons.docUpload}
/>

<AccountSetupButton 
label="Employment Letter"
onPress={() => CheckEmployerSelected('document')}
icon={icons.docUpload}
/>

<AccountSetupButton 
label="Passport photograph"
onPress={() => CheckEmployerSelected('document')}
icon={icons.docUpload}
/>

    </View>

    <View style={styles.btnBox}>
    <FormButton label="Save and Continue" />
    </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  titleDesc: {
    marginTop: wp(3),
    marginBottom: wp(4),
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    width: wp(70),
    lineHeight: wp(5),
    color: COLORS.disablePrimaryBlue,
},
mainTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4.3),
    color: COLORS.primaryBlue,
  },
  title: {
    marginVertical: hp(2)
  },
  btnBox: {
    marginVertical: wp(10)
},
  whiteBG: {
    backgroundColor: COLORS.White,
    padding: wp(4),
    borderRadius: wp(5),
    marginTop: hp(3),
    paddingBottom: wp(8),
    marginHorizontal:wp(4)
  },
  logo: {
    marginTop: hp(10),
    marginHorizontal: wp(4)
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.BackgroundGrey
  }
})

export default DocumentUploadScreen