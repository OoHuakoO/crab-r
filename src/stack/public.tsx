import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePasswordScreen from '@src/screens/changePassword';
import ForgetPasswordScreen from '@src/screens/forgetPassword';
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
            <Stack.Screen
                name="ForgetPassword"
                options={{
                    headerShown: false
                }}
                component={ForgetPasswordScreen}
            />
            <Stack.Screen
                name="ChangePassword"
                options={{
                    headerShown: false
                }}
                component={ChangePasswordScreen}
            />
        </Stack.Navigator>
    );
};

export default PublicStack;
