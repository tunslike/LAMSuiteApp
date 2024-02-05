import React from 'react'
import { StyleSheet, 
        Text, 
        View, 
        ActivityIndicator, Dimensions
        } from 'react-native';
import { COLORS, images, FONTS, icons } from '../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Loader = ({title}) => {
    const { width, height } = Dimensions.get("window");

  return (
    <View style={[styles.container, {height, width}]}>
    <ActivityIndicator size="large" style={styles.indicator}/>
    <Text style={styles.loaderText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    indicator: {
        padding: wp(5),
        backgroundColor: COLORS.White,
        borderRadius: wp(5)
    },
    loaderText: {
        color: COLORS.White,
        fontSize: wp(3),
        marginTop: wp(5),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
    },
    loaderBody: {
        backgroundColor: COLORS.White,
        height: wp(25),
        width: wp(25),
        borderRadius: wp(3)
    },
    container : {
        position: 'absolute',
        zIndex: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loader;