import React, { FC, useCallback, useState } from 'react';
import { Platform, SafeAreaView, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import { RemoveFcmToken, RemoveUser } from '@src/services/login';
import { loginState, useSetRecoilState } from '@src/store';
import { theme } from '@src/theme';
import { LoginState } from '@src/typings/common';
import { PrivateStackParamsList } from '@src/typings/navigation';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SettingScreenProps = NativeStackScreenProps<
    PrivateStackParamsList,
    'Setting'
>;

const SettingScreen: FC<SettingScreenProps> = () => {
    const { top } = useSafeAreaInsets();
    const setLogin = useSetRecoilState<LoginState>(loginState);
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [isRemoveUser, setIsRemoveUser] = useState<boolean>(false);

    const handleCloseDialog = () => {
        setVisibleDialog(false);
    };

    const handleLogout = useCallback(async () => {
        try {
            const FcmTokenValue = await AsyncStorage.getItem('FcmToken');
            const FcmTokenJson = JSON.parse(FcmTokenValue);
            const response = await RemoveFcmToken({
                fcmToken: FcmTokenJson,
                platform: Platform.OS
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

    const handleOpenDialogRemoveUser = useCallback(() => {
        setIsRemoveUser(true);
        setVisibleDialog(true);
        setContentDialog(
            'ข้อมูลทั้งหมดที่เกี่ยวข้องกับบัญชีของคุณจะถูกลบอย่างถาวร'
        );
    }, []);

    const handleRemoveUser = useCallback(async () => {
        try {
            const FcmTokenValue = await AsyncStorage.getItem('FcmToken');
            const FcmTokenJson = JSON.parse(FcmTokenValue);
            const response = await RemoveUser({
                fcmToken: FcmTokenJson,
                platform: Platform.OS
            });

            if (response.status === 200) {
                setLogin({ role: '', token: '' });
                await AsyncStorage.setItem('Login', '');
            } else {
                setVisibleDialog(true);
                setContentDialog(`Something went wrong remove user`);
                return;
            }
            setIsRemoveUser(false);
            setVisibleDialog(false);
            setContentDialog('');
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog(`Something went wrong remove user`);
        }
    }, [setLogin]);

    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <Header />
            <AlertDialog
                visible={visibleDialog}
                textContent={contentDialog}
                handleClose={handleCloseDialog}
                handleConfirm={() =>
                    isRemoveUser ? handleRemoveUser() : handleCloseDialog()
                }
                showCloseDialog={isRemoveUser}
            />
            <TouchableOpacity
                style={styles.buttonApply}
                onPress={() => handleLogout()}
            >
                <Text style={styles.textLogin}>ออกจากระบบ</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonRemove}
                onPress={() => handleOpenDialogRemoveUser()}
            >
                <Text style={styles.textLogin}>ลบบัญชีผู้ใช้</Text>
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
        fontFamily: 'K2D-Bold',
        color: theme.colors.primary,
        fontSize: 16
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
    },
    buttonRemove: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 50,
        backgroundColor: theme.colors.secondary
    }
});

export default SettingScreen;
