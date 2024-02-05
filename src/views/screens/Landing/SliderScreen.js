import React, {useState, useRef} from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, 
  Dimensions} from 'react-native';
  import Carousel, {Pagination} from 'react-native-snap-carousel'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { FeatureLabel, Button, SliderButton } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

 
const SliderScreen = ({navigation}) => {

  const { width, height } = Dimensions.get("window");

  const [activateDotIndex, setActiveDotIndex] = useState(0);
  const _carouselRef = useRef();

  const data = [
    {
        id: '1',
        image: images.slider1,
        title: 'Loan Disbursement in Minutes',
        description: 'Enjoy fast and reliable loan payouts in minutes'
    },
    {
        id: '2',
        image: images.slider2,
        title: 'Reliable Investment Offers',
        description: 'Access wide and flexible range of investment plans that fit you'
    },
    {
        id: '3',
        image: images.slider3,
        title: 'Pay Utility Bills at Ease',
        description: 'Pay your utility bills faster and much convenient options'
    },
  ]

console.log(activateDotIndex)

 const _renderItem = ({item, index}) => {
      return (
          <View style={styles.sliderBody}>
            <Image source={item.image} 
              style={{
                height: wp(60), width: wp(60), 
                resizeMode: 'contain', borderRadius: wp(5)
              }}
            />
            <Text style={styles.sliderTitle}>{item.title}</Text>
            <Text style={styles.sliderDesc}>{item.description}</Text>
          </View>
      )
  }

  return (
   <SafeAreaView style={{backgroundColor: COLORS.BackgroundGrey, flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logo}>
            <Image source={images.appLogo} 
            style={{
                  height: wp(17), width: wp(17), borderRadius: wp(4), resizeMode: 'contain'
            }} />
      </View>
      <Carousel 
          ref={_carouselRef}
          data={data}
          renderItem={_renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          onSnapToItem={index => setActiveDotIndex(index)}
      />
      <Pagination 
      carouselRef={_carouselRef} 
      activeDotIndex={activateDotIndex} 
      dotsLength={3}  
      dotStyle={{
        width: wp(4), height: wp(1), backgroundColor: COLORS.primaryRed
      }}
      inactiveDotStyle={{
        width: wp(2.3), height: wp(2.3), backgroundColor: COLORS.primaryBlue
      }}
      />

      {(activateDotIndex == 2) &&
        <View style={styles.slideBtns}>
          <SliderButton 
            onPress={() => navigation.navigate("CreateAccount")} 
            type={1} 
            label="Create an Account" 
          />
          <TouchableOpacity 
            onPress={() => navigation.navigate("Login")}
          style={styles.loginBtn}>
            <Text style={styles.loginTxt}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      }

      {(activateDotIndex < 2) &&
        <View style={styles.slideBtns}>
              <SliderButton onPress={() => {
              _carouselRef.current.snapToItem(activateDotIndex + 1)
              }} type={1} label="Continue" />
              <SliderButton type={2} label="Skip" />
        </View>
      }

   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loginTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize:  wp(3.5),
    color: COLORS.primaryRed,
    fontWeight: '400',
    marginRight: wp(1.5),
  },
  loginBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: wp(3.5),
    borderStyle: 'solid',
    borderColor: COLORS.primaryRed,
    borderWidth: 1,
    paddingHorizontal: wp(7),
    paddingVertical: Platform.OS === 'ios' ? wp(3) :  wp(2.8),
  },
  slideBtns: {
    marginBottom: wp(23)
  },
  sliderTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4.8),
    width: wp(50),
    textAlign: 'center',
    color: COLORS.primaryRed,
    marginTop: wp(3)
  },
  sliderDesc: {
      marginTop: wp(3),
      fontFamily: FONTS.POPPINS_MEDIUM,
      fontSize: wp(3.2),
      width: wp(70),
      textAlign: 'center',
      lineHeight: wp(5),
      color: COLORS.sliderDescText,
  },
  sliderBody: {
    alignItems: 'center',
    marginTop: wp(8)
  },
  logo: {
    alignItems: 'center',
    marginTop: wp(13)
},
})

export default SliderScreen;