import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const NetworkAmount = ({active, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={(active) ? styles.container_active : styles.container}>

    {(active) &&
          <Image source={icons.check} 
          style={{
            height: wp(6), width: wp(6), resizeMode: 'contain', tintColor: COLORS.primaryRed
          }}
        />
    }
      <Text style={(active) ? styles.tenorTxt_active : styles.tenorTxt}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tenorTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.primaryBlue,
    fontSize: wp(3.5)
  },
  tenorTxt_active: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.primaryRed,
    fontSize: wp(3.5)
  },
  container: {
    backgroundColor: COLORS.tabColorActive,
      borderStyle: 'solid',
      paddingVertical: wp(1),
      paddingHorizontal: wp(4),
      borderColor: COLORS.BackgroundGrey,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: wp(5),
      columnGap: 1,
  },

  container_active: {
    backgroundColor: COLORS.tabColorActive,
    borderStyle: 'solid',
    paddingVertical: wp(1.5),
    paddingRight:wp(1.8),
    borderColor: COLORS.primaryRed,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp(5),
    columnGap: 1,
},
})

export default NetworkAmount;