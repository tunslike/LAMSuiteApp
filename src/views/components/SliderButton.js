import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const SliderButton = ({label, onPress, type, signup}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={(type == 1) ? styles.container_bold : styles.container_border}
    >
     <Text style={(type == 1) ? styles.labelTxt_bold : styles.labelTxt_border}>{label}</Text>
     <Image source={icons.arrow_thick} 
     style={{
         height:wp(4), width: wp(4), resizeMode: 'contain', tintColor: (type == 1) ? COLORS.White : COLORS.primaryRed
     }}
  />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  labelTxt_bold: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.5),
    color: COLORS.White,
    fontWeight: '400',
    marginRight: wp(3),
  },
  labelTxt_border: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize:  wp(3.5),
    color: COLORS.primaryRed,
    fontWeight: '400',
    marginRight: wp(3),
  },
   container_bold : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlue,
    alignSelf: 'center',
    borderRadius: wp(3.5),
    paddingHorizontal: wp(16),
    paddingVertical: Platform.OS === 'ios' ? wp(3.7) : wp(3.2),
    marginBottom: wp(3)
   },
   container_border : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: wp(3.5),
    borderStyle: 'solid',
    borderColor: COLORS.primaryRed,
    borderWidth: 1,
    paddingHorizontal: wp(11.8),
    paddingVertical: Platform.OS === 'ios' ? wp(2.9) : wp(2.3),
   }
})

export default SliderButton;