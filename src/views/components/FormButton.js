import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
         View,
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const FormButton = ({label, onPress, disable, type, signup}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.container_bold,{backgroundColor: (disable) ? COLORS.disablePrimaryBlue : COLORS.primaryBlue,}]}
        disabled={disable}
    >
        <Text style={styles.labelTxt_bold}>{label}</Text>
        <Image source={icons.arrow_thick} 
        style={{
            height:wp(3.5), width: wp(3.5), resizeMode: 'contain', tintColor: COLORS.White
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
   container_bold : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: wp(3.5),
    paddingVertical: Platform.OS === 'ios' ? wp(3.8) : wp(3),
    marginBottom: wp(3),
    paddingHorizontal: wp(15)
   }
})

export default FormButton;