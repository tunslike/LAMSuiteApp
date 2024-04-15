import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity, View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const ProfileLinks = ({linkName, icon, onPress}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={styles.container}
    >
        <Image source={icon} 
            style={{
                width: wp(4), height: wp(4), resizeMode: 'contain', tintColor: COLORS.ButtonBorderBlue
            }}
        />
    
       <Text style={styles.linkText}>{linkName}</Text>

       <Image source={icons.profile_arrow} 
            style={{
                width: wp(5), height: wp(5), resizeMode: 'contain', tintColor: COLORS.primaryRed
            }}
       />
    
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    linkText: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3.1),
        color: COLORS.accountTypeDesc,
        flex: 1
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: wp(3),
        marginHorizontal: wp(4),
        marginBottom: wp(5),
        columnGap: wp(3)
    }
})

export default ProfileLinks;