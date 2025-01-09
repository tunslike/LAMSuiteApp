import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         Keyboard,
        TextInput, TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const OnboardingTextBox = ({ placeholder,length, phone, pwd, visibleOnPress, onFocus, onChange, value, icon, eye_type, setSecureText}) => {
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
            keyboardType={(phone == 1) ? 'numeric': "default"}
            autoCapitalize='none'
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={setSecureText}
            returnKeyType='next'
            maxLength={length}
            onFocus={onFocus}
        />

        {pwd == true &&
          <TouchableOpacity
          onPress={visibleOnPress}
      >
          <Image 
          source={eye_type}
          style={{
              height:wp(5), width:wp(5), resizeMode: 'contain',
              tintColor: COLORS.TextColorGrey
          }}
          />
      </TouchableOpacity>
         

        }
        
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.2),
    color: COLORS.TextColorGrey,
    flex: 1

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