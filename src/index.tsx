import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import PrivateStack from './stack/private';
import PublicStack from './stack/public';
import { loginState, useRecoilState } from './store';
import { LoginState } from './typings/common';
import { RootStackParamsList } from './typings/navigation';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
    const [login, setLogin] = useRecoilState<LoginState>(loginState);

    const getUserLogin = useCallback(async () => {
        try {
            const loginValue = await AsyncStorage.getItem('Login');
            if (loginValue !== null && loginValue !== '') {
                setLogin(JSON.parse(loginValue));
            }
        } catch (err) {
            console.log(err);
        }
    }, [setLogin]);

    const hideSplashScreen = useCallback(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 500);
    }, []);

    useEffect(() => {
        getUserLogin();
    }, [getUserLogin]);

    useEffect(() => {
        hideSplashScreen();
    }, [hideSplashScreen]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {login?.token !== '' ? (
                    <Stack.Screen
                        options={{
                            headerShown: false
                        }}
                        name="PrivateStack"
                        component={PrivateStack}
                    />
                ) : (
                    <Stack.Screen
                        options={{
                            headerShown: false
                        }}
                        name="PublicStack"
                        component={PublicStack}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
