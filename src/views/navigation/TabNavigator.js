import React from 'react';

import {StyleSheet, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DashboardScreen, HistoryScreen, LoansScreen, ProfileScreen } from '../screens';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <Tab.Navigator
            
        screenOptions={{
            tabBarShowLabel:false,
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: 'grey',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                height: hp(6.8),
                borderRadius: 50,
                marginBottom: Platform.OS === 'ios' ? hp(3.2) : hp(2),
                marginHorizontal:10,
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
                    icon={icons.cart}
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
                    icon={icons.history}
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
                    icon={icons.profile}
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