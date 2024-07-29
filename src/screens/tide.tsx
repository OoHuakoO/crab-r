/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import { theme } from '@src/theme';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

type TideScreenProps = NativeStackScreenProps<HomeStackParamsList, 'Tide'>;

const TideScreen: FC<TideScreenProps> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <WebView
                source={{ uri: 'https://reactnative.dev/' }}
                style={{ flex: 1 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary
    },
    scrollView: {
        flex: 1,
        marginTop: 75
    },
    menuListContainer: {
        alignItems: 'center',
        marginTop: 20
    }
});

export default TideScreen;
