import React from 'react'
import { StyleSheet, 
         Text, 
         Image, Dimensions,
        View, ImageBackground } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const AccountCardNoLoan = ({rating, onPress}) => {

  const { width, height } = Dimensions.get("window");

  return (
   <View style={styles.container}>
     <ImageBackground
      imageStyle={{ borderRadius: wp(7)}}
      source={images.cardbg}
      resizeMode="cover"
      style={{
          height: wp(40), width: wp(95),
          resizeMode: 'contain',
     }}
     >
      <View style={styles.alertWin}>
            <Text style={styles.textStatus}>No Active Loan</Text>
      </View>
      <Text style={styles.lnTxthdr}>Tap new loan to get started</Text>
     </ImageBackground>
   </View>
  )
}

const styles = StyleSheet.create({

  lnTxthdr: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.companySetupBorder,
    alignSelf: 'center',
    marginTop: wp(3)
  },

  textStatus: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.balanceAmountColor,
    fontSize: wp(4.3),
    textAlign: 'right'
  },
  alertWin: {
    borderColor: COLORS.companySetupBorder,
    borderRadius: wp(3),
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: wp(6),
    paddingVertical: wp(3),
    alignSelf: 'center',
    marginTop: wp(12)
  },
  container: {
    flex: 1
  },
})

export default AccountCardNoLoan;