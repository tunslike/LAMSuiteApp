import React, { useState, useEffect } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, 
  Alert,
  ScrollView,
  Dimensions} from 'react-native';
  import axios from 'axios';
  import { useSelector} from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import {LoanPaymentTypeCard, Loader, InnerHeader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const NotificationScreen = ({navigation}) => {

  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);

  // STATES
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState('');


  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>

      {isLoading &&
        <Loader title="Processing your request, please wait..." />
      }

      <InnerHeader onPress={() => navigation.goBack()} title="Notification" />

      <View style={styles.midBody}>

        <Text style={styles.profile_txt}>Your notification will show here</Text>
      
      </View>

    

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  profile_txt: {
    color: COLORS.primaryRed,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.1)
  },  
  midBody: {
    borderRadius: wp(8),
    marginHorizontal: wp(2),
    backgroundColor: COLORS.White,
    marginTop: wp(2.5),
    paddingBottom: wp(4),
    minHeight: wp(65),
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default NotificationScreen;