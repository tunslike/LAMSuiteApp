import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity, View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const KYCStatusCard = ({status, onPress, icon}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={[styles.container, {borderColor: COLORS.TextBoxBorderGrey}]}>
          <View style={styles.iconBox}>
          <Image source={icon} 
          style={{
            height: wp(5), width: wp(5), resizeMode: 'contain', tintColor: COLORS.primaryRed
          }}
        />
          </View>
           
                  <View style={{flex: 1}}>
                      <Text style={[styles.acctName, {color: COLORS.primaryBlue}]}>KYC Status</Text>
                  </View>
               
                    <TouchableOpacity style={styles.rmvBody}>
                      <Text style={styles.removetxt}>{status}</Text>
                    </TouchableOpacity>
                              
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
    fontSize: wp(3.3)
  },
  iconBox: {
    padding:wp(1.5),
    borderRadius: wp(10),
    backgroundColor: COLORS.ButtonBgGrey
},
  container: {
    backgroundColor: COLORS.White,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: wp(4),
      columnGap: wp(3),
      marginHorizontal: wp(2),
      paddingHorizontal: wp(3),
      paddingVertical: wp(3),
      marginBottom: wp(3.3)

  },
})

export default KYCStatusCard;