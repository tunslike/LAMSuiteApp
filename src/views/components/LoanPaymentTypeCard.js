import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity, View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const LoanPaymentTypeCard = ({channelName, icon, active, ready, onPress}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={[styles.container, {borderColor: (active) ? COLORS.primaryRed : COLORS.TextBoxBorderGrey,}]}>
          <View style={styles.iconBox}>
          <Image source={icon} 
          style={{
            height: wp(5), width: wp(5), resizeMode: 'contain', tintColor: (active) ? COLORS.primaryRed : COLORS.ButtonBorderBlue
          }}
        />
          </View>
           
                  <View style={{flex: 1}}>
                      <Text style={[styles.acctName, {color: (active) ? COLORS.primaryRed : COLORS.primaryBlue,}]}>{channelName}</Text>
                  </View>

                  {(active) && 
                    <TouchableOpacity style={[styles.rmvBody, {backgroundColor: COLORS.primaryRed}]}>
                        <Text style={[styles.removetxt, {color: COLORS.White}]}>Active</Text>
                    </TouchableOpacity>
                  }

                  {(!active) && 
                    <TouchableOpacity style={styles.rmvBody}>
                    {ready &&
                      <Text style={styles.removetxt}>Pay now</Text>
                    }
                    {!ready &&
                      <Text style={styles.removetxt}>Disabled</Text>
                    }
                     
                    </TouchableOpacity>
                  }                  
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  rmvBody: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    borderRadius: wp(4),
    backgroundColor: COLORS.ButtonBgGrey
  },
  removetxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
      color: COLORS.primaryRed,
      fontSize: wp(2.7)
  },
  acctNo: {
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: wp(3),
      color: COLORS.sliderDescText
  },
  acctName: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.1)
  },
  iconBox: {
    padding:wp(1.5),
    borderRadius: wp(10),
    backgroundColor: COLORS.ButtonBgGrey
},
  container: {
      borderWidth: 1,
      borderStyle: 'solid',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: wp(4),
      columnGap: wp(5),
      marginHorizontal: wp(6),
      paddingHorizontal: wp(3),
      paddingVertical: wp(3),
      marginBottom: wp(3.3)
  },
})

export default LoanPaymentTypeCard;