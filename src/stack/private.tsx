import NotificationScreen from '@src/screens/notification';
import SettingScreen from '@src/screens/setting';
import { theme } from '@src/theme';
import React, { memo } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryStack from './historyStack';
import HomeStack from './homeStack';

const Tab = createMaterialBottomTabNavigator();
const PrivateStack = () => {
    return (
        <Tab.Navigator
            labeled={false}
            initialRouteName="HomeStack"
            activeColor={theme.colors.gold}
            inactiveColor={theme.colors.black}
            barStyle={{
                backgroundColor: theme.colors.white
            }}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <FeatherIcon name="home" size={30} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="HistoryStack"
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="history"
                            size={30}
                            color={color}
                        />
                    )
                }}
                component={HistoryStack}
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
                component={NotificationScreen}
            />
            <Tab.Screen
                name="Setting"
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <FeatherIcon name="settings" size={28} color={color} />
                    )
                }}
                component={SettingScreen}
            />
        </Tab.Navigator>
    );
};

export default memo(PrivateStack);
