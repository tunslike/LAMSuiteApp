import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
         View,
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const InnerHeader = ({title, onPress, notificationPress}) => {
  return (
   <View style={styles.header}>
        <TouchableOpacity onPress={onPress} style={styles.bellBG}>
        <Image source={icons.arrow_back}
        style={{
            height: wp(4.5), width: wp(4.5), resizeMode: 'contain', tintColor: COLORS.primaryBlue
          }}
        />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.tabAreas}>
         <TouchableOpacity 
         onPress={notificationPress}
         style={styles.bellBG}>
             <Image source={icons.notification} 
               style={{
                 height: wp(4.5), width: wp(4.5), resizeMode: 'contain', tintColor: COLORS.primaryBlue
               }}
             />
         </TouchableOpacity>
   </View>
   </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(4),
        color: COLORS.primaryBlue
    },
    bellBG: {
        backgroundColor: COLORS.notificationBG,
        padding: wp(1.5),
        borderRadius: wp(2.8)
      },
    header: {
        backgroundColor: COLORS.White,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: wp(8),
        borderBottomRightRadius: wp(8),
        paddingTop:Platform.OS === 'android' ? wp(5) : wp(17),
        paddingBottom: wp(5),
        paddingHorizontal: wp(3)
      }
})

export default InnerHeader;