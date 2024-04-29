import React from 'react'
import { Platform, StyleSheet, 
         Text, 
        View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const BreakdownEntry = ({header1, header2, desc1, desc2, descStyle}) => {
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.hdr}>{header1}</Text>
            <Text style={[styles.desc, {...descStyle}]}>{desc1}</Text>
        </View>
        <View>
            <Text style={[styles.hdr, {textAlign: 'right'}]}>{header2}</Text>
            <Text style={[styles.desc, {textAlign: 'right', ...descStyle}]}>{desc2}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  desc: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.primaryRed,
    fontSize: wp(3),
    marginTop: wp(1)
  },
  hdr: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3),
    color: COLORS.accountTypeDesc
  },
  creditTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.TextColorGrey,
    fontSize: wp(3)
  },
  container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Platform.OS === 'android' ? wp(3.5) : wp(6)
  },
})

export default BreakdownEntry;