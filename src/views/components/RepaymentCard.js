import React from 'react'
import { StyleSheet, 
         Text, 
         Image, Dimensions,
        View, ImageBackground } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const RepaymentCard = ({amount, narration, date, channel}) => {

  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.tablehdr}>
      <View style={{flex: 1, marginBottom: wp(1)}}>
            <Text style={styles.monthTxt}>{narration}</Text>
            <Text style={styles.desc_txt}>{date}</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.amount}>{Intl.NumberFormat('en-US').format(amount)}</Text>
          <Text style={[styles.desc_txt, {color: COLORS.TextColorGrey}]}>{channel}</Text>
      </View>
</View>
  )
}

const styles = StyleSheet.create({
  amount: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3),
    color: COLORS.accountTypeDesc
  },
  desc_txt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.primaryRed,
    fontSize: wp(2.8),
    marginTop: wp(0.4)
  },

  hdr_txt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.accountTypeDesc
  },

  monthHdr: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    columnGap: wp(2),
    paddingLeft: wp(2)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    marginTop: wp(2)
  },
  monthTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.primaryBlue,
    fontSize: wp(3.1),
  },
  colHdr: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.TextColorGrey,
    fontSize: wp(2.8)
  },
  tablehdr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(2),
    borderRadius: wp(3),
    backgroundColor: COLORS.ButtonBgGrey,
    marginBottom: wp(2)
  },

})

export default RepaymentCard;