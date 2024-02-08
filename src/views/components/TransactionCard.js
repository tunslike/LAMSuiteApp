import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const TransactionCard = ({narration, amount, date, icon}) => {
  return (
   <View style={styles.container}>
      <View style={styles.iconbox}> 
        <Image 
        source={icon}
        style={{
          height: wp(5),
          width: wp(5),
          tintColor: COLORS.primaryRed
        }}
      />
      </View>
        <View style={{flex: 1}}>
          <Text style={styles.narration}>{narration}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.amtBox}>
          <Text style={styles.sign}>₦</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
   </View>
  )
}

const styles = StyleSheet.create({
  iconbox: {
    backgroundColor: "#F3F4F7",
    padding: wp(2.5),
    borderRadius: wp(3),
  },
  sign: {
      fontFamily: FONTS.POPPINS_REGULAR,
      color: COLORS.primaryRed,
      fontSize: wp(3)
  },
  amtBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(1)
  },
  amount: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.8),
    color: COLORS.accountTypeDesc
  },
  narration: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.accountTypeDesc
  },
  date: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.disablePrimaryBlue
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: wp(3),
    marginBottom: wp(3)
  }
})

export default TransactionCard;