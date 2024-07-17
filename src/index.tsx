import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PublicStack from './stack/public';
import { RootStackParamsList } from './typings/navigation';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="PublicStack"
                    component={PublicStack}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
