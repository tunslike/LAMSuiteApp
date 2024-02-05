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

const AccountSetupScreen = ({navigation}) => {

    const BottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    //callbacks
    const handleSheetChange = useCallback((index) => {
        console.log(index)
    }, []);

  return (

    <SafeAreaView style={{
      flexGrow: 1,
      backgroundColor: COLORS.BackgroundGrey
    }}>
    <StatusBar barStyle="dark-content" />

    <View>
    <BottomSheet
    ref={BottomSheetRef}
    index={1}
    snapPoints={snapPoints}
    onChange={handleSheetChange}
    >
    <View style={styles.dropBottomList}>
      <Text>This is BottomSheet Content</Text>
    </View>
    </BottomSheet>
</View>

          <View style={styles.logo}>
          <Image source={images.appLogo} 
          style={{
                height: wp(16), width: wp(16), borderRadius: wp(4), resizeMode: 'contain'
          }} />
      </View>

      <View style={styles.whiteBG}> 


      <View style={styles.title}>
        <Text style={styles.mainTitle}>Scheme Account Setup</Text>
        <Text style={styles.titleDesc}>Please complete the details below to 
        activate your company account setup</Text>
      </View>

      <View style={styles.dropBox}>
      
          <TouchableOpacity style={styles.dropDown}>
            <Image source={icons.coy_account_type} 
              style={{
                height: wp(4), width: wp(4), marginBottom: wp(1),
                tintColor: COLORS.TextColorGrey, resizeMode: 'contain'
              }}
            />
            <Text style={styles.dropTxt}>Select Company or Employer name</Text>
          </TouchableOpacity>

      </View>

      <View style={styles.kycBox}>
          <Text style={styles.kycHeader}>PROVIDE KYC DETAILS</Text>

          <AccountSetupButton 
              label="Complete Bio-Data"
              icon={icons.profile}
          />

          <AccountSetupButton 
              label="Upload Documents"
              icon={icons.docUpload}
          />
      </View>
      </View>

      <View style={styles.btnBox}>
      <FormButton onPress={() => navigation.navigate("AccountType")} label="Complete Setup" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dropBottomList: {
    flex: 1,
  },
  dropDown: {
    borderRadius: wp(4),
    borderColor: COLORS.companySetupBorder,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: wp(3),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(3)
  },
  dropTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.TextColorGrey
  },
  btnBox: {
    marginTop: wp(10)
  },
  dropBox: {
    marginBottom: wp(7)
  },
  kycBox: {
      paddingTop: wp(2)
  },
  kycHeader: {
    color: COLORS.TextColorGrey,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    marginBottom: wp(2)
  },
  titleDesc: {
    marginTop: wp(3),
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.8),
    width: wp(70),
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
    paddingBottom: wp(8)
  },
  logo: {
    marginHorizontal: wp(5),
    marginTop: hp(6)
  }

})

export default AccountSetupScreen;