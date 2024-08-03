import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@src/screens/login';
import RegisterScreen from '@src/screens/register';
import { PublicStackParamsList } from '@src/typings/navigation';
import React from 'react';

const Stack = createNativeStackNavigator<PublicStackParamsList>();

const PublicStack = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                options={{
                    headerShown: false
                }}
                component={LoginScreen}
            />
            <Stack.Screen
                name="Register"
                options={{
                    headerShown: false
                }}
                component={RegisterScreen}
            />
        </Stack.Navigator>
    );
};

export default PublicStack;
