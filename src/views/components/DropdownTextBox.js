import React from 'react'
import { StyleSheet, 
         Text, 
         Image, Dimensions,
        View, ImageBackground } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const DropdownTextBox = ({data, label, onSelect}) => {

  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
        <Text style={styles.dropDowntextLabel}>{label}</Text>
        <SelectDropdown 
        data={data}
        onSelect={onSelect}
        defaultButtonText="Select here"
        dropdownStyle={{
          borderRadius: wp(3),
        }}
        rowTextStyle={{
          fontFamily: FONTS.POPPINS_REGULAR,
          fontSize: wp(3.2),
        }}
        buttonStyle={{
          backgroundColor: COLORS.White,
          borderRadius: wp(3),
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: COLORS.TextBoxBorderGrey,
          width: wp(42),
          height: wp(11),
          color: COLORS.sliderDescText
          
        }}
        buttonTextStyle={{
          fontFamily: FONTS.POPPINS_REGULAR,
          fontSize: wp(3.2),
          textAlign: 'left',
          color: COLORS.sliderDescText
        }}
      />
      </View>
  )
}

const styles = StyleSheet.create({

    dropDowntextLabel: {
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.2),
        color: COLORS.sliderDescText,
        marginLeft: wp(3),
        marginBottom: wp(1)
      },
  container: {
    flex: 1
  },
})

export default DropdownTextBox;