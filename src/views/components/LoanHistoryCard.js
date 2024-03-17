import React from 'react'
import { StyleSheet, 
         Text, 
         Image, Dimensions,
        View, ImageBackground } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoanHistoryCard = ({loanPurpose, onPress, date, loanAmount, status}) => {

  const { width, height } = Dimensions.get("window");

  return (
  <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.bagCircle}>
        <Image source={icons.money_bag} 
          style= {{
            height: wp(4), width: wp(4), resizeMode: 'contain', tintColor: COLORS.LandingGreyText
          }}
        />
      </View>
      <View style={{flex: 1}}>
      <Text style={styles.hdrTxt}>{loanPurpose}</Text>
      <Text style={styles.downTxt}>{date}</Text>
    </View>
    <View style={{alignItems: 'flex-end'}}>
      <Text style={styles.loanAmt}>{loanAmount}</Text>
      <Text style={styles.downTxt}>{status}</Text>
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  downTxt: {
    color: COLORS.sliderDescText,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.8),
    marginTop: wp(1)
  },
  loanAmt: {
    color: COLORS.primaryRed,
    fontSize: wp(3.5),
    fontFamily: FONTS.POPPINS_MEDIUM
  },
  hdrTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.5),
    color: COLORS.primaryBlue
  },
  bagCircle: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BackgroundGrey,
  },
  container: {
    borderRadius: wp(5.5),
    marginHorizontal: wp(2),
    backgroundColor: COLORS.White,
    marginTop: wp(1.5),
    paddingBottom: wp(4),
    padding: wp(3),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: wp(3),
    alignItems: 'center',
    marginBottom: wp(1.5)
  }

})

export default LoanHistoryCard;