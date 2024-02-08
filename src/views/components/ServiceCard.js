import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
         View,
         ImageBackground,
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, images, icons } from '../../constants'

const ServiceCard = ({image,label, icon, textStyles, onPress, iconStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
    <ImageBackground
      imageStyle={{ borderRadius: wp(5)}}
      source={image}
      style={{
        height: wp(30), width: wp(45), padding: wp(4)
      }}
    >
        <View style={styles.iconBox}>
          <Image source={icon}
            style={{
              height: wp(5.5), width: wp(5.5), resizeMode: 'contain', 
              ...iconStyle
            }}
          />
        </View>
        <Text style={[styles.servTxt, {
          ...textStyles
        }]}>{label}</Text>
    </ImageBackground>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  servTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.7),
    marginTop: wp(6)
  },
  iconBox: {
    backgroundColor: COLORS.White,
    padding: wp(2.3),
    height: wp(10),
    width: wp(10),
    borderRadius: wp(7)
  },
  container: {
    padding: wp(4)
  }
})

export default ServiceCard;