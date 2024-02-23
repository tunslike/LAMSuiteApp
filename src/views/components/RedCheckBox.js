import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity, View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const RedCheckBox = ({textLabel, toggleBtn, onPress}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={styles.skipSetup}>
            
    <View style={(toggleBtn == 1) ? styles.checkBox_checked : styles.checkBox_notchecked}>
        <Image source={icons.check} 
          style={{
            height: (toggleBtn == 1) ? wp(3) : wp(4), width: (toggleBtn == 1) ? wp(3) : wp(4), resizeMode: 'contain', tintColor: COLORS.White
          }}
        />
    </View>
    
    <Text style={styles.skipText}>{textLabel}</Text>
    
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkBox_checked: {
    backgroundColor: COLORS.primaryRed,
    borderRadius: wp(1.5),
    marginLeft: wp(1.5)
  },
  checkBox_notchecked: {
    borderColor: COLORS.TextBoxBorderGrey,
    borderRadius: wp(1.5),
    borderWidth: 1,
    borderStyle: 'solid',
  },
  skipText: {
    color: COLORS.TextColorGrey,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    width: wp(78)
  },
  skipSetup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    columnGap: wp(1.5),
    marginBottom: wp(4),
  },
})

export default RedCheckBox;