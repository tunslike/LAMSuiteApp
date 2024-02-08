import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image, 
    Platform} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from '../../constants';

const TabIcon = ({focused, icon, title, addStyle}) => {
  if(focused) {
    return (
        <View style={[styles.isFocusedTab,{...addStyle}]}>
            <Image source={icon} 
                style={{
                    height: wp(5.5),
                    width: wp(5.5),
                    resizeMode: 'contain',
                    tintColor: COLORS.primaryBlue
                }}
            />
            <Text
                style={styles.focusText}
            >{title}</Text>
        </View>
    )
  }else {
    return (
        <View style={styles.notFocusedTab}>
            <Image source={icon} 
                style={{
                    height: wp(5.5),
                    width: wp(5.5),
                    resizeMode: 'contain',
                    tintColor: COLORS.tabColorActive
                }}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    focusText: {
        color: COLORS.primaryBlue,
        fontSize: wp(3.5),
        fontFamily: "Benton Sans",
        fontWeight: 'bold',
        marginLeft:wp(1),
    },
    notFocusedTab: {
        alignItems: 'center',
        justifyContent: 'center',
        height: wp(10),
        width: wp(15),
        marginTop: Platform.OS === 'ios' ? wp(6.5) : null
    },
    isFocusedTab: {
        backgroundColor: COLORS.tabColorActive,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: wp(3),
        paddingVertical:wp(2),
        borderRadius: wp(3),
        marginLeft:wp(4),
        marginTop: Platform.OS === 'ios' ? wp(6.5) : null
    }
});

export default TabIcon;