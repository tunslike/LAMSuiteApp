import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity, View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const AccountType = ({type, label, icon, description, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor: (type == 1) ? COLORS.ButtonBgGrey : COLORS.White,
        borderColor: (type == 1) ? COLORS.primaryRed : COLORS.TextBoxBorderGrey,
    } ]}>
        <View style={[styles.iconBox, {backgroundColor: (type == 1) ? COLORS.White : COLORS.ButtonBgGrey} ]}>
            <Image source={icon} 
                style={{
                    height: wp(5), width: wp(5), resizeMode: 'contain', 
                    tintColor: (type == 1) ? COLORS.primaryRed : COLORS.accountTypeDesc
                }}
            />
        </View>
        <View style={{flex: 1, marginLeft: wp(5)}}>
                <Text style={[styles.header, {color: (type == 1) ? COLORS.primaryRed : COLORS.TextColorGrey}]}>{label}</Text>
                <Text style={styles.desc}>{description}</Text>
        </View>
        <View style={[styles.checkBox, {backgroundColor: (type == 1) ? COLORS.primaryRed : COLORS.White,
                                        borderWidth: (type == 0) ? 1 : null, borderColor: (type == 0) ? COLORS.TextBoxBorderGrey : null,
                                        borderStyle: (type == 0) ? 'solid' : null,
                                        borderRadius: (type == 1) ? wp(1.3) : wp(1.2)
                                       }]}>
            
            <Image source={icons.check} 
                style={{
                    height: (type == 1) ? wp(5) : wp(4.2), width: (type == 1) ? wp(5) : wp(4.2), resizeMode: 'contain', 
                    tintColor: COLORS.White
                }}
            />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    checkBox: {
        backgroundColor: COLORS.primaryRed,
    },
    desc: {
        color: COLORS.accountTypeDesc,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3)
    },
    header: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(4),
    },
    iconBox: {
        padding:wp(4),
        borderRadius: wp(10)
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(6),
        borderRadius: wp(5),
        borderWidth:1,
        borderStyle: 'solid',
        marginBottom: wp(4)
    }
})

export default AccountType;