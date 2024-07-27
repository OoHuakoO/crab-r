import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeSreen from '@src/screens/home';
import knowledgeScreen from '@src/screens/knowledge';
import SaveCrabHatchScreen from '@src/screens/saveCrabHatch';
import SaveDataScreen from '@src/screens/saveData';
import SaveWaterAfterScreen from '@src/screens/saveWaterAfter';
import SaveWaterBeforeScreen from '@src/screens/saveWaterBefore';

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
                component={SaveDataScreen}
            />
            <Stack.Screen
                name="SaveWaterBefore"
                options={{
                    headerShown: false
                }}
                component={SaveWaterBeforeScreen}
            />
            <Stack.Screen
                name="SaveWaterAfter"
                options={{
                    headerShown: false
                }}
                component={SaveWaterAfterScreen}
            />
            <Stack.Screen
                name="SaveCrabHatch"
                options={{
                    headerShown: false
                }}
                component={SaveCrabHatchScreen}
            />
        </Stack.Navigator>
    );
};

export default memo(HomeStack);
