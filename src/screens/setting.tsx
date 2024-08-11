import React, { FC, useCallback, useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import { RemoveFcmToken } from '@src/services/login';
import { loginState, useSetRecoilState } from '@src/store';
import { theme } from '@src/theme';
import { LoginState } from '@src/typings/common';
import { PrivateStackParamsList } from '@src/typings/navigation';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

type SettingScreenProps = NativeStackScreenProps<
    PrivateStackParamsList,
    'Setting'
>;

const SettingScreen: FC<SettingScreenProps> = () => {
    const setLogin = useSetRecoilState<LoginState>(loginState);
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');

    const handleCloseDialog = () => {
        setVisibleDialog(false);
    };

    const handleLogout = useCallback(async () => {
        try {
            const FcmTokenValue = await AsyncStorage.getItem('FcmToken');
            const FcmTokenJson = JSON.parse(FcmTokenValue);
            const response = await RemoveFcmToken({
                fcmToken: FcmTokenJson
            });
            if (response.status === 200) {
                setLogin({ role: '', token: '' });
                await AsyncStorage.setItem('Login', '');
            } else {
                setVisibleDialog(true);
                setContentDialog(`Something went wrong logout`);
                return;
            }
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog(`Something went wrong logout`);
        }
    }, [setLogin]);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <AlertDialog
                visible={visibleDialog}
                textContent={contentDialog}
                handleClose={handleCloseDialog}
                handleConfirm={handleCloseDialog}
            />
            <TouchableOpacity
                style={styles.buttonApply}
                onPress={() => handleLogout()}
            >
                <Text style={styles.textLogin}>ออกจากระบบ</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary
    },
    textLogin: {
        fontFamily: 'K2D-Medium',
        color: theme.colors.primary,
        fontSize: 15
    },
    buttonApply: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 50,
        backgroundColor: theme.colors.secondary
    }
});

export default SettingScreen;
