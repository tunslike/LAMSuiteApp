import React, {useState, useEffect} from 'react'
import { 
    Image,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    Platform,
    StyleSheet, 
    Text, 
    View } from 'react-native';
    import axios from 'axios';
    import { COLORS, images, FONTS, icons } from '../../../constants';
    import { FeatureLabel, Button } from '../../components';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const WelcomeScreen = ({navigation}) => {

  const [isUserValid, setIsUserValid] = useState(null);
  const [data, setData] = useState(null);
  const [token, setToken] = useState("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dW5zbGlrZSIsImlhdCI6MTczMDEwOTE3NSwiZXhwIjoxNzMwMTI3MTc1fQ.YlkUplTDCWldpCjma4J1My8aDoPr4y6KgJC2etb7Sui6OQi0Cmky8zUOuv26rYJbDq-6OaJxrIP-oI0daC-qGg");


  // function to verify data
  const fetchBearerToken = () => {

    const data = {
      username: "tunslike",
      password: "@Dmin123$"

    };

    axios.post('http://localhost:8082/api/v1/auth/login',data,{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {

      console.log(response.data)

      setData(response.data)

    })
    .catch(error => {
      console.log(error);
    });

}// end of function 


   // FUNCTION TO CHECK LOGGED USER
   const ValidatedAuthenticatedUser = async () => {
    try {
        
        let userData = await AsyncStorage.getItem('userLogged');

        if(userData) {
          console.log('user has logged in before')
          setIsUserValid(userData);
        }else{
          console.log('New User found')
        }
        
        
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
 }
// END OF FUNCTION

//USE EFFECT
useEffect(() => {

  fetchBearerToken();

  ValidatedAuthenticatedUser();

}, []);


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

      <View style={{marginTop: wp(6)}}>
        <Button 
        onPress={() => navigation.navigate('Slider')} 
        label="Get Started" />

        {isUserValid &&
          <TouchableOpacity onPress={() => navigation.replace("Login")} style={styles.btnLogin}>
            <Text style={styles.labelTxt}>Login</Text>
          </TouchableOpacity>
        }

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

  labelTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: Platform.OS === 'android' ? wp(3.5) : wp(3.8),
    color: COLORS.White,
    fontWeight: '400',
  },

  btnLogin: {
    backgroundColor: COLORS.primaryRed,
    alignSelf: 'center',
    borderRadius: wp(5),
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: wp(17),
    paddingVertical: Platform.OS === 'ios' ? wp(3.5) : wp(2.7),
    marginTop: wp(3)
  },
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