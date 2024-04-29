import React, {useState, useContext} from 'react'
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
  import { useSelector, useDispatch } from 'react-redux';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { ProfileLinks, Loader, InnerHeader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ProfileScreen = ({navigation}) => {

  const {ExitAuthenticatedUser} = useContext(AuthContext);


    // function to load facilities
    const LogoutAuthenticatedUser = () => {

      Alert.alert("Finserve", 'Do you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
          ExitAuthenticatedUser();
        }},
      ]);
    }
  // end of function

  return (
    <ScrollView style={{
        flexGrow: 1,
        backgroundColor: COLORS.BackgroundGrey
      }}>

      <InnerHeader onPress={() => navigation.goBack()} title="Profile" />

      <Text style={styles.headerTitle}>Account</Text>
      <View style={styles.midBody}>
          <ProfileLinks 
            onPress={() => navigation.navigate("ViewProfile")}
            icon={icons.profile_person}
            linkName="View Profile"
          />
          <ProfileLinks 
          onPress={() => navigation.navigate("NotificationScreen")}
          icon={icons.profile_notification}
          linkName="Notification"
          />
          <ProfileLinks 
          icon={icons.change_password}
          linkName="Change Password"
          />
      </View>

      <Text style={styles.headerTitle}>Support</Text>
      <View style={styles.midBody}>
          <ProfileLinks 
            icon={icons.send_email}
            linkName="Need Help? Send Email"
          />
          <ProfileLinks 
          icon={icons.faq}
          linkName="Frequently Asked Questions"
          />
      </View>

      <Text style={styles.headerTitle}>About Us</Text>
      <View style={styles.midBody}>
          <ProfileLinks 
            icon={icons.profile_about}
            linkName="About Finserve"
          />
          <ProfileLinks 
          icon={icons.profile_privacy}
          linkName="Privacy Policy"
          />
          <ProfileLinks 
          icon={icons.agreement}
          linkName="Terms of agreement"
          />
          <ProfileLinks 
          icon={icons.feedback}
          linkName="Give us Feedback"
          />
      </View>

      <TouchableOpacity 
        onPress={() => LogoutAuthenticatedUser()}
        style={styles.logoutbtn}>
        <Text style={styles.logoutTxt}>Logout</Text>
      </TouchableOpacity>

    

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logoutTxt: {
    color: COLORS.White,
    textAlign: 'center',
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3)
  },
  logoutbtn: {
    backgroundColor: COLORS.primaryRed,
    marginTop: wp(5),
    width: wp(50),
    alignSelf: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
    marginHorizontal: wp(6),
    marginBottom: wp(28),
    borderRadius: wp(7)
  },
  headerTitle: {
    marginTop: Platform.OS === 'android' ? wp(3) : wp(4),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.TextColorGrey,
    fontSize: wp(3),
    marginLeft: wp(10)
  },
  midBody: {
    paddingTop: Platform.OS === 'android' ? wp(7) : wp(8),
    borderRadius: wp(6),
    marginHorizontal: wp(2),
    backgroundColor: COLORS.White,
    marginTop: wp(1.5),
    paddingBottom: Platform.OS === 'android' ? wp(3) : wp(4),
    padding: wp(3),
    marginTop: wp(2),
  },
})

export default ProfileScreen;