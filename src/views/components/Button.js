import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const Button = ({label, onPress}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={styles.container}
    >
     <Text style={styles.labelTxt}>{label}</Text>
     <Image source={icons.arrow_thick} 
     style={{
         height:wp(4), width: wp(4), resizeMode: 'contain', tintColor: COLORS.primaryRed
     }}
  />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  labelTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.8),
    color: COLORS.primaryRed,
    fontWeight: '400',
    marginRight: wp(3),
    paddingTop: wp(0.5)
    
  },
   container : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.White,
    alignSelf: 'center',
    borderRadius: wp(4.5),
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: wp(8),
    paddingVertical: Platform.OS === 'ios' ? wp(3.5) : wp(2.7),

   }
})

export default Button;