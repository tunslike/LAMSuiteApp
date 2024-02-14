import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const BlueButton = ({label, onPress}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={styles.container}
    >
     <Text style={styles.labelText}>{label}</Text>
     <Image source={icons.arrow_thick} 
     style={{
         height:wp(4), width: wp(4), marginLeft: wp(3), resizeMode: 'contain', tintColor: COLORS.White
     }}
  />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  labelText: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    color: COLORS.White,
  },
  container: {
    marginTop: wp(3),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: wp(31.3),
    paddingVertical: wp(3.5),
    borderRadius: wp(4),
    marginBottom: wp(3),
  },
})

export default BlueButton;