import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeSreen from '@src/screens/home';
import knowledgeScreen from '@src/screens/knowledge';
import saveDataScreen from '@src/screens/saveData';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { memo } from 'react';

const Stack = createNativeStackNavigator<HomeStackParamsList>();
const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                options={{
                    headerShown: false
                }}
                component={HomeSreen}
            />
            <Stack.Screen
                name="Knowledge"
                options={{
                    headerShown: false
                }}
                component={knowledgeScreen}
            />
            <Stack.Screen
                name="SaveData"
                options={{
                    headerShown: false
                }}
                component={saveDataScreen}
            />
        </Stack.Navigator>
    );
};

export default memo(HomeStack);
