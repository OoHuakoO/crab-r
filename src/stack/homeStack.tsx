import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlkalineScreen from '@src/screens/alkaline';
import AmmoniaScreen from '@src/screens/ammonia';
import ChlorineScreen from '@src/screens/chlorine';
import CrabCircleScreen from '@src/screens/crabCircle';
import HomeSreen from '@src/screens/home';
import knowledgeScreen from '@src/screens/knowledge';
import MagnesiumScreen from '@src/screens/magnesium';
import PhScreen from '@src/screens/ph';
import SaveCrabHatchScreen from '@src/screens/saveCrabHatch';
import SaveDataScreen from '@src/screens/saveData';
import SaveWaterAfterScreen from '@src/screens/saveWaterAfter';
import SaveWaterBeforeScreen from '@src/screens/saveWaterBefore';
import TideScreen from '@src/screens/tide';

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
            <Stack.Screen
                name="Tide"
                options={{
                    headerShown: false
                }}
                component={TideScreen}
            />
            <Stack.Screen
                name="CrabCircle"
                options={{
                    headerShown: false
                }}
                component={CrabCircleScreen}
            />
            <Stack.Screen
                name="Ph"
                options={{
                    headerShown: false
                }}
                component={PhScreen}
            />
            <Stack.Screen
                name="Ammonia"
                options={{
                    headerShown: false
                }}
                component={AmmoniaScreen}
            />
            <Stack.Screen
                name="Chlorine"
                options={{
                    headerShown: false
                }}
                component={ChlorineScreen}
            />
            <Stack.Screen
                name="Magnesium"
                options={{
                    headerShown: false
                }}
                component={MagnesiumScreen}
            />
            <Stack.Screen
                name="Alkaline"
                options={{
                    headerShown: false
                }}
                component={AlkalineScreen}
            />
        </Stack.Navigator>
    );
};

export default memo(HomeStack);
