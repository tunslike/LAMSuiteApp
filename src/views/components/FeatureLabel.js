import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
         View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS } from '../../constants'

const FeatureLabel = ({label, icon}) => {
  return (
    <View
      style={styles.roundBG}
    >
      <Image source={icon} style={{
        height: wp(7), width: wp(7), tintColor: COLORS.primaryRed, resizeMode: 'contain'
      }} />
      <Text style={styles.labelTxt}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  labelTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.5),
    color: COLORS.LandingGreyText,
    fontWeight: '400'
    
  },
   roundBG : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: wp(4.5),
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: wp(8),
    paddingVertical: Platform.OS === 'ios' ? wp(2.5) : wp(2),
    borderColor: COLORS.featureBorderColor,
    columnGap: wp(3),
    width: wp(47),
    marginBottom: wp(5)
   }
})

export default FeatureLabel;