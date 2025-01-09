import React from 'react'
import { StyleSheet, 
         Text, 
         Image, Dimensions,
        View, ImageBackground } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const PaymentScheduleCard = ({month, principal, interest, balance}) => {

  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.tablehdr}>
      <View style={styles.monthHdr}>
      <Image source={icons.calender} 
        style={{
          height: wp(4), width: wp(4), tintColor: COLORS.primaryRed, resizeMode: 'contain'
        }}
      />
      <Text style={styles.monthTxt}>{month}</Text>
    </View>
    <View>
    </View>
    <View style={styles.row}>
        <View>
            <Text style={styles.hdr_txt}>Principal</Text>
            <Text style={styles.desc_txt}>{Intl.NumberFormat('en-US').format(principal)}</Text>
        </View>
        <View>
          <Text style={styles.hdr_txt}>Interest</Text>
          <Text style={styles.desc_txt}>{Intl.NumberFormat('en-US').format(interest)}</Text>
        </View>
        <View>
          <Text style={styles.hdr_txt}>Balance</Text>
          <Text style={styles.desc_txt}>{Intl.NumberFormat('en-US').format(balance)}</Text>
        </View>
    </View>
</View>
  )
}

const styles = StyleSheet.create({
  desc_txt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.primaryRed,
    fontSize: wp(3),
    marginTop: wp(0.5),
    textAlign: 'center'
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
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.primaryBlue,
    fontSize: wp(3),
  },
  colHdr: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.TextColorGrey,
    fontSize: wp(2.8)
  },
  tablehdr: {
    padding: wp(2),
    borderRadius: wp(4),
    backgroundColor: COLORS.ButtonBgGrey,
    marginBottom: wp(2)
  },

})

export default PaymentScheduleCard;