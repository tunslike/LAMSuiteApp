import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         Keyboard,
        TextInput } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const BiodataTextbox = ({ label, full, placeholder,maxlength, phone, onFocus, onChange, value, icon, setSecureText}) => {
  return (
    <View style={styles.container}>

       <View style={styles.row}>
          <Text style={styles.textLabel}>{label}</Text>
          {icon &&

            <Image 
              source={icon}
              style={{
                width: wp(4), height: wp(4), resizeMode: 'contain', 
                tintColor: COLORS.sliderDescText
              }}
            />
          }

       </View>
        

        <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            style={[styles.inputStyle, {width: (full) ? '100%' : wp(41)}]}
            placeholderTextColor={COLORS.darkGray}
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

    row: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      columnGap: wp(3)
    },
    textLabel: {
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: wp(3.2),
      color: COLORS.sliderDescText,
      marginLeft: wp(3)
    },
    inputStyle: {
      fontFamily: FONTS.POPPINS_MEDIUM,
      fontSize: wp(3.2),
      color: COLORS.TextColorGrey,
      borderRadius: wp(3),
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: COLORS.TextBoxBorderGrey,
      paddingHorizontal: wp(3.5),
      paddingVertical: Platform.OS === 'ios' ? wp(2.8) : wp(2),
      marginTop: wp(1),
      marginHorizontal: wp(1)
  },
   boxStyle : {
    borderRadius: wp(3.5),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.TextBoxBorderGrey,
    paddingHorizontal: wp(4),
    paddingVertical: Platform.OS === 'ios' ? wp(4) : wp(5),
    marginTop: wp(3.5),
    marginHorizontal: wp(1)

   }
})

export default BiodataTextbox;