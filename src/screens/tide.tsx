/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import { theme } from '@src/theme';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

type TideScreenProps = NativeStackScreenProps<HomeStackParamsList, 'Tide'>;

const TideScreen: FC<TideScreenProps> = () => {
    const { top } = useSafeAreaInsets();
    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <Header />
            <WebView
                source={{
                    uri: 'https://www.thailandtidetables.com/%E0%B9%84%E0%B8%97%E0%B8%A2/%E0%B8%81%E0%B8%A3%E0%B8%B2%E0%B8%9F%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A5%E0%B8%87-%E0%B9%81%E0%B8%AB%E0%B8%A5%E0%B8%A1%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C-%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-477.php'
                }}
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
    }
});

export default TideScreen;
