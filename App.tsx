import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';
import App from './src';
import { theme } from './src/theme';

const requestUserPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
        }

        const authStatus = await messaging().requestPermission();

        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            const token = await messaging().getToken();
            console.log('FCM Token:', token);
            await AsyncStorage.setItem('FcmToken', JSON.stringify(token));
        }
    } catch (err) {
        console.error('Permission error:', err);
    }
};

function Main() {
    useEffect(() => {
        requestUserPermission();
    }, []);

    return (
        <RecoilRoot>
            <Provider theme={theme}>
                <App />
            </Provider>
        </RecoilRoot>
    );
}

export default Main;
