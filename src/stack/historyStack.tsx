import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistorySaveDataScreen from '@src/screens/historySaveData';
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
        </Stack.Navigator>
    );
};

export default memo(HistorySaveDataStack);
