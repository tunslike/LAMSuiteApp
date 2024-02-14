import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const SummaryLine = ({title, narration}) => {
  return (
   <View style={styles.container}>
    <Text style={styles.titleTxt}>{title}</Text>
    <Text style={styles.narrationTxt}>{narration}</Text>
   </View>
  )
}

const styles = StyleSheet.create({
  narrationTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.primaryRed
  },
  titleTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.TextColorGrey
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:wp(1.5)
  }
})

export default SummaryLine;