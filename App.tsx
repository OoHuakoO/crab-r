import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';
import App from './src';
import { theme } from './src/theme';
function Main() {
    useEffect(() => {
        const requestUserPermission = async () => {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
                const token = await messaging().getToken();
                console.log('FCM token:', token);
            }
        };
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
