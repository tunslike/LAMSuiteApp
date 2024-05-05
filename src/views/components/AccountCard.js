import React from 'react'
import { StyleSheet, 
         Text, 
         Image, Dimensions,
        View, ImageBackground } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const AccountCard = ({loanNumber, loanBalance, nextPayment, employer, status }) => {

  const { width, height } = Dimensions.get("window");

  return (
   <View style={styles.container}>
     <ImageBackground
      imageStyle={{ borderRadius: wp(7)}}
      source={images.cardbg}
      resizeMode="cover"
      style={{
          height: wp(40), width: wp(95),
          resizeMode: 'contain',
     }}
     >
      <View style={styles.topData}>
          <View style={styles.coyDetails}>
              <Text style={styles.acctNo}>{loanNumber}</Text>
              <Text style={styles.coyName}>{employer}</Text>
          </View>
          <View style={styles.loanStatus}>
              <Text style={styles.txtStatus}>Status</Text>

              {(status == 3) &&
                  <View style={styles.loanFlag}>
                  <Image source={icons.check} 
                    style={{
                      height: wp(5), width: wp(5), tintColor: COLORS.loanStatusGreen, resizeMode: 'contain'
                    }}
                  />
                  <Text style={styles.txtActive}>Active</Text>
                </View>
              }
          </View>
      </View>
      <View style={styles.bottomData}>
          <View style={styles.amtArea}>
                <Text style={styles.lnTxthdr}>Loan Balance</Text>
                <View style={styles.currency}>
                  <Text style={styles.curSign}>₦</Text><Text style={styles.loanAmt}>{Intl.NumberFormat('en-US').format(loanBalance)}</Text>
                </View>
          </View>
                  <View style={styles.repymt}>
                  <Text style={styles.lnTxthdr}>Next Repayment</Text>
                  <Text style={styles.repayAmt}>₦{Intl.NumberFormat('en-US').format(nextPayment)}</Text>
                  </View>
      </View>
     </ImageBackground>
   </View>
  )
}

const styles = StyleSheet.create({
  repymt: {
    paddingRight: wp(4)
  },
  curSign: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(4),
    color: COLORS.LandingGreyText,
    marginRight:wp(1)
  },
  lnTxthdr: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.companySetupBorder,
    marginLeft: wp(4.5)
  },
  loanAmt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.balanceAmountColor,
    fontSize: wp(6.5)
  },
  repayAmt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.balanceAmountColor,
    fontSize: wp(4.3),
    textAlign: 'right'
  },
  amtArea: {
    paddingHorizontal: wp(2)
  },
  currency: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  coyName: {
    color: COLORS.companySetupBorder,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3)
  },
  acctNo: {
    color: COLORS.accountNumberColor,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.4),
    marginTop:wp(2),
  },
  txtStatus: {
    color: COLORS.companySetupBorder,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.4)
  },
  txtActive: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.loanStatusGreen,
    marginRight: wp(1)
  },
  loanFlag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(0.2),
    borderColor: COLORS.loanStatusGreen,
    borderWidth:1,
    borderStyle: 'solid',
    borderRadius: wp(4)
  },
  loanStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
    columnGap: wp(2),
  },
  coyDetails: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(2)
  },
  bottomData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp(4)
  },
  topData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
})

export default AccountCard;