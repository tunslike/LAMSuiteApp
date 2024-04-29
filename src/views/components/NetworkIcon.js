import React from 'react'
import { StyleSheet, 
         Text, 
         Image, TouchableOpacity,
        View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const NetworkIcon = ({image, onPress, active}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.container, {borderWidth: 2, borderColor: active ? COLORS.primaryRed : COLORS.White}]}>
      <Image source={image} 
        style={{
          height: wp(13), width: wp(13), borderRadius: wp(2)
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tabColorActive,
    borderRadius: wp(5),
    paddingVertical: wp(2.8),
    paddingHorizontal: wp(2.8)
  }
})

export default NetworkIcon;