import HomeScreen from '@src/screens/home';
import ProfileScreen from '@src/screens/profile';
import { theme } from '@src/theme';
import React, { memo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

const Tab = createMaterialBottomTabNavigator();
const PrivateStack = () => {
    return (
        <Tab.Navigator
            labeled={false}
            initialRouteName="Home"
            activeColor={theme.colors.gold}
            inactiveColor={theme.colors.black}
            barStyle={{
                backgroundColor: theme.colors.white
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <FeatherIcon name="home" size={30} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <FeatherIcon name="user" size={30} color={color} />
                    )
                }}
                component={ProfileScreen}
            />
            <Tab.Screen
                name="Notification"
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <IonIcons
                            name="notifications-outline"
                            size={30}
                            color={color}
                        />
                    )
                }}
                component={ProfileScreen}
            />
            <Tab.Screen
                name="Setting"
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <FeatherIcon name="settings" size={28} color={color} />
                    )
                }}
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
};

export default memo(PrivateStack);
