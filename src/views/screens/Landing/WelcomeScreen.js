import React from 'react'
import { 
    Image,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    Platform,
    StyleSheet, 
    Text, 
    View } from 'react-native';
    import { COLORS, images, FONTS, icons } from '../../../constants';
    import { FeatureLabel, Button } from '../../components';
    import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const WelcomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        resizeMethod="auto"
        style={styles.welcomebg}
        source={images.imgBG}
      >
      <View style={styles.logo}>
      <Image source={images.appLogo} 
      style={{
            height: wp(18), width: wp(18), borderRadius: wp(4), resizeMode: 'contain'
      }}
      />
      <View style={styles.features}>
            <FeatureLabel 
                icon={icons.loans_icon}
                label="Loans"/>
            <FeatureLabel 
            icon={icons.invest_icon}
            label="Investment"/>
            <FeatureLabel 
            icon={icons.savings_icon}
            label="Savings"/>
            <FeatureLabel 
            icon={icons.pay_icons}
            label="Payments"/>
      </View>

      <View style={{marginTop: wp(9)}}>
        <Button 
        onPress={() => navigation.navigate('Slider')} 
        label="Get Started" />
      </View>
</View>
<View style={styles.footer}>
<Text style={styles.footerTxt}>By Finserve Investment Limited</Text>
</View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

    footerTxt: {
      fontFamily: FONTS.POPPINS_LIGHT,
      fontSize: wp(3),
      color: COLORS.LandingGreyText,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        paddingBottom: Platform.OS === 'ios' ? wp(7) : wp(5)
    },
    features: {
        marginTop: wp(12),
    },
    logo: {
        alignItems: 'center',
        marginTop: wp(45)
    },
    welcomebg: {
        flex: 1,
        resizeMode: 'contain'
    }
})

export default WelcomeScreen;