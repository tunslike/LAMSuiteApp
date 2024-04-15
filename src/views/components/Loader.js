import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         ActivityIndicator
      } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const Loader = () => {
  return (
    <View style={styles.preloader}>
      <ActivityIndicator style={styles.loader} color={COLORS.White} size={'large'} />
    </View>
  )
}

const styles = StyleSheet.create({

  loader: {
    marginTop: hp(5)
  },
  preloader: {
      position: 'absolute',
      zIndex: 9999,
      alignSelf: 'center',
      top: '40%',
      backgroundColor: COLORS.darkGrayTransparent,
      height: wp(30),
      width: wp(30),
      borderRadius: wp(10),
  },
   
})

export default Loader;