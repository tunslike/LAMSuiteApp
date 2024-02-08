import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const GreenCheckBox = ({rating, onPress}) => {
  return (
    <View style={styles.checkedGreen}>
              <Image source={icons.check_thick}
               style={{
                height: wp(6), width: wp(6), resizeMode: 'contain', tintColor: COLORS.White,
                alignSelf: 'center', marginTop: wp(1)
               }}
              />
    </View>
  )
}

const styles = StyleSheet.create({
  checkedGreen: {
    backgroundColor: COLORS.checkedColorGreen,
    borderRadius: wp(5),
    height: wp(8),
    width: wp(8),
}
})

export default GreenCheckBox;