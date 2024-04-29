import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const CreditRating = ({rating, onPress}) => {
  return (
    <TouchableOpacity style={styles.creditStatus}>
                  <Image source={icons.star} 
                    style={{
                      height: wp(4), width: wp(4), resizeMode: 'contain', tintColor: COLORS.TextColorGrey
                    }}
                  />
                  <Text style={styles.creditTxt}>Bronze</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  creditTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.TextColorGrey,
    fontSize: wp(3)
  },
  creditStatus: {
      borderWidth: 1,
      borderStyle: 'solid',
      padding: wp(0.7),
      paddingHorizontal:wp(2),
      borderColor: COLORS.BackgroundGrey,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: wp(5),
      columnGap: 3
  },
})

export default CreditRating;