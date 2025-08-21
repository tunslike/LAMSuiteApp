import React from 'react';

import {StyleSheet, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DashboardScreen, HistoryScreen, LoansScreen, ProfileScreen } from '../screens';

import { COLORS, icons, images } from '../../constants';
import { TabIcon } from '../components';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <Tab.Navigator
            
        screenOptions={{
            tabBarShowLabel:false,
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: COLORS.primaryBlue,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                height: hp(6),
                borderRadius: wp(5),
                marginBottom: Platform.OS === 'ios' ? hp(3) : hp(6),
                marginHorizontal:10,
                paddingBottom:Platform.OS === 'ios' ? wp(6) : hp(0),
                borderTopColor: 'transparent'
            }
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={DashboardScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.home}
                    title="Home"    
                />
            }}
            />
        <Tab.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.history}
                    title="History"    
                />
            }}
            />
        <Tab.Screen 
            name="Loans" 
            component={LoansScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.loan}
                    title="Loans"    
                />
            }}
            />
        <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.user}
                    title="Profile" 
                    addStyle={{
                        marginLeft:-18,
                    }}   
                />
            }}
            />
    </Tab.Navigator>
    )
}

export default TabNavigator;