import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         Keyboard,
        TextInput } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const OnboardingTextBox = ({ placeholder,maxlength, phone, onFocus, onChange, value, icon, setSecureText}) => {
  return (
    <View style={styles.container}>

        <Image source={icon} 
            style={{
                width: wp(4.5), height: wp(4.5), 
                resizeMode: 'contain', tintColor: COLORS.TextColorGrey,
                marginRight: wp(3)
            }}
        />

        <TextInput
            value={value}
            onChangeText={onChange}
            style={styles.inputStyle}
            placeholder={placeholder}
            placeholderTextColor="#bfbfbf"
            keyboardType={(phone == 1) ? "phone-pad" : "default"}
            autoCapitalize='none'
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={setSecureText}
            returnKeyType='next'
            maxLength={maxlength}
            onFocus={onFocus}
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.2),
    width: wp(100),
    color: COLORS.TextColorGrey,

  },
   container : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp(3.5),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.TextBoxBorderGrey,
    paddingHorizontal: wp(4),
    paddingVertical: Platform.OS === 'ios' ? wp(4) : wp(0.2),
    marginTop: wp(3.5),
    marginHorizontal: wp(1)

   }
})

export default OnboardingTextBox;