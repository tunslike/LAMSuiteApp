import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
        TouchableOpacity, View } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const AccountSetupButton = ({type, label, completed, icon, description, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.iconBox}>
            <Image source={icon} 
                style={{
                    height: wp(4), width: wp(4), resizeMode: 'contain', 
                    tintColor: COLORS.ButtonBorderBlue
                }}
            />
        </View>
        <View style={{flex: 1, marginLeft: wp(5)}}>
                <Text style={styles.header}>{label}</Text>
        </View>

        {(completed) &&
            <Image source={icons.check} 
            style={{
                height: wp(8), width: wp(8), resizeMode: 'contain', 
                tintColor: COLORS.successGreen
            }}
        />
        }

        {(!completed) &&
            <Image source={icons.arrow_thick} 
            style={{
                height: wp(4.2), width: wp(4.2), resizeMode: 'contain', 
                tintColor: COLORS.primaryRed
            }}
        />
        }
            
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
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.1),
        color: COLORS.primaryBlue
    },
    iconBox: {
        backgroundColor: COLORS.White,
        padding:wp(2),
        borderRadius: wp(10)
    },
    container: {
        backgroundColor: COLORS.ButtonBgGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(2),
        borderRadius: wp(4),
        marginBottom: wp(3),
        paddingHorizontal: wp(5)
    }
})

export default AccountSetupButton;