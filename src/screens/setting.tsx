import React, { FC, useCallback, useEffect, useState } from 'react';
import { Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import { GetUser, RemoveFcmToken, RemoveUser } from '@src/services/login';
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
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');

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

    const handleGetUser = useCallback(async () => {
        try {
            const res = await GetUser();
            if (res?.status === 200) {
                setName(`${res?.data?.name} ${res?.data?.surname}`);
                setLocation(res?.data?.location);
            } else {
                setVisibleDialog(true);
                setContentDialog('Something went wrong get data');
                return;
            }
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog('Something went wrong get data');
        }
    }, []);

    useEffect(() => {
        handleGetUser();
    }, [handleGetUser]);

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
            <View style={styles.boxName}>
                <Text style={styles.textShow}>ชื่อ-นามสกุล : </Text>
                <Text style={styles.textShow}>{name} </Text>
            </View>
            <View style={styles.boxLocation}>
                <Text style={styles.textShow}>สถานที่ : </Text>
                <Text style={styles.textShow}>{location} </Text>
            </View>

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
        backgroundColor: theme.colors.primary,
        alignItems: 'center'
    },
    textLogin: {
        fontFamily: 'K2D-Bold',
        color: theme.colors.primary,
        fontSize: 16
    },
    textShow: {
        fontFamily: 'K2D-Bold',
        color: theme.colors.white,
        fontSize: 18,
        letterSpacing: 0,
        lineHeight: 36
    },
    buttonApply: {
        marginTop: 30,
        paddingVertical: 12,
        paddingHorizontal: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.secondary
    },
    buttonRemove: {
        paddingVertical: 12,
        paddingHorizontal: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: theme.colors.secondary
    },
    boxName: {
        marginTop: 100,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    boxLocation: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default SettingScreen;
