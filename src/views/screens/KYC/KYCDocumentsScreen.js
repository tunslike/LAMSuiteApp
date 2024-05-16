import React, {useState, useCallback, useEffect, useContext} from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, Button,
  Alert,
  ScrollView,
  Dimensions} from 'react-native';
  import { useSelector, useDispatch } from 'react-redux';
  import DocumentPicker from "react-native-document-picker"
  import { SelectList } from 'react-native-dropdown-select-list'
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { AccountSetupButton, LoaderWindow, FormButton,InnerHeader } from '../../components';
  import { updateDOCdataStatus } from '../../../store/customerSlice';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const KYCDocumentsScreen = ({navigation}) => {

  const dispatch = useDispatch();

  const passport = useSelector((state) => state.customer.passport_data);
  const meansid = useSelector((state) => state.customer.meansid_data);
  const empletter = useSelector((state) => state.customer.empletter_data);

  const saveUpdatedocument = () => {

    dispatch(updateDOCdataStatus(1));
    navigation.navigate("KYCStatus");
  }

  return (
    <ScrollView style={styles.container}>

    <InnerHeader onPress={() => navigation.goBack()} title="Upload Documents" />


      <View style={styles.whiteBG}> 

      <View style={styles.title}>
      <Text style={styles.titleDesc}>Tap below to upload each of the documents</Text>
    </View>


    <AccountSetupButton 
    label="Passport photograph"
    onPress={() => (passport == 1) ? null : navigation.navigate("DocumentUpload", {doctype: "PASSPORT", header_desc: "Upload Passport"})}
    icon={icons.docUpload}
    completed={(passport == 1) ? true : false}
  />

  <AccountSetupButton 
    label="Means of Identification"
    onPress={() =>  (meansid == 1) ? null : navigation.navigate("DocumentUpload", {doctype: "MEANS_OF_ID", header_desc: "Upload Means of ID"})}
    icon={icons.docUpload}
    completed={(meansid == 1) ? true : false}
/>

<AccountSetupButton 
    label="Employment Letter"
    onPress={() => (empletter == 1) ? null : navigation.navigate("DocumentUpload", {doctype: "EMPLOYMENT_LETTER", header_desc: "Upload Employement Letter"})}
    icon={icons.docUpload}
    completed={(empletter == 1) ? true : false}
/>

    </View>

    <View style={styles.btnBox}>

    {(passport == 1 || meansid == 1 || empletter == 1) && 
      <FormButton onPress={() => saveUpdatedocument()} label="Save and Continue" />
    }
    </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  titleDesc: {
    marginLeft: wp(3),
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: wp(3),
      width: wp(70),
      lineHeight: wp(5),
      marginBottom: wp(3),
      color: COLORS.primaryRed,
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
    borderRadius: wp(8),
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

export default KYCDocumentsScreen