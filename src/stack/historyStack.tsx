import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryListScreen from '@src/screens/historyList';
import HistorySaveDataScreen from '@src/screens/historySaveData';
import WaterBeforeDetailScreen from '@src/screens/waterBeforeDetail';
import { HistoryStackParamsList } from '@src/typings/navigation';

import React, { memo } from 'react';

const Stack = createNativeStackNavigator<HistoryStackParamsList>();
const HistorySaveDataStack = () => {
    return (
        <Stack.Navigator initialRouteName="HistorySaveData">
            <Stack.Screen
                name="HistorySaveData"
                options={{
                    headerShown: false
                }}
                component={HistorySaveDataScreen}
            />
            <Stack.Screen
                name="HistoryList"
                options={{
                    headerShown: false
                }}
                component={HistoryListScreen}
            />
            <Stack.Screen
                name="WaterBeforeDetail"
                options={{
                    headerShown: false
                }}
                component={WaterBeforeDetailScreen}
            />
        </Stack.Navigator>
    );
};

export default memo(HistorySaveDataStack);
