import React, { FC, useCallback, useEffect, useState } from 'react';
import { BackHandler, SafeAreaView, View } from 'react-native';

import InputText from '@src/components/core/inputeText';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import ToastComponent from '@src/components/core/toast';
import { theme } from '@src/theme';
import { LoginParams } from '@src/typings/login';
import { PublicStackParamsList } from '@src/typings/navigation';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Portal } from 'react-native-paper';

type LoginScreenProps = NativeStackScreenProps<PublicStackParamsList, 'Login'>;

const LoginScreen: FC<LoginScreenProps> = (props) => {
    const { navigation } = props;

    const form = useForm<LoginParams>({});
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    // const handleLogin = useCallback(
    //     async (data: LoginParams) => {
    //         try {
    //             const response = await Login({
    //                 login: data?.login,
    //                 password: data?.password
    //             });
    //             if (
    //                 response?.error ||
    //                 data?.login === '' ||
    //                 data?.password === ''
    //             ) {
    //                 setVisibleDialog(true);
    //                 setContentDialog('Email Or Password Incorrect');
    //                 return;
    //             }
    //             const loginObj = {
    //                 session_id: response?.result?.session_id,
    //                 uid: response?.result?.uid
    //             };
    //             setLogin(loginObj);
    //             await AsyncStorage.setItem('Login', JSON.stringify(loginObj));

    //             const settings = await AsyncStorage.getItem('Settings');
    //             const jsonSettings: SettingParams = JSON.parse(settings);
    //             await AsyncStorage.setItem(
    //                 'Settings',
    //                 JSON.stringify({
    //                     ...jsonSettings,
    //                     login: data?.login,
    //                     password: data?.password
    //                 })
    //             );

    //             handleCreateDevice(data?.login, data?.password);
    //             handleActiveUser(data?.login, data?.password);

    //             setTimeout(() => {
    //                 setToast({ open: true, text: 'Login Successfully' });
    //             }, 0);
    //         } catch (err) {
    //             console.log(err);
    //             setVisibleDialog(true);
    //             setContentDialog(`Something went wrong login`);
    //         }
    //     },
    //     [handleActiveUser, handleCreateDevice, setLogin, setToast]
    // );

    const handleVisiblePassword = useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    const handleCloseDialog = () => {
        setVisibleDialog(false);
    };

    useEffect(() => {
        const onBackPress = () => {
            BackHandler.exitApp();
            return true;
        };
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );
        return () => {
            subscription.remove();
        };
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Portal>
                <AlertDialog
                    visible={visibleDialog}
                    handleClose={handleCloseDialog}
                    handleConfirm={handleCloseDialog}
                />
            </Portal>
            <View style={styles.sectionLogin}>
                <Controller
                    name="login"
                    defaultValue=""
                    control={form?.control}
                    render={({ field }) => (
                        <InputText
                            {...field}
                            placeholder="Email"
                            returnKeyType="next"
                            autoCapitalize="none"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            onChangeText={(value) => field?.onChange(value)}
                        />
                    )}
                />
                <Controller
                    name="password"
                    defaultValue=""
                    control={form?.control}
                    render={({ field }) => (
                        <InputText
                            {...field}
                            isPasswordVisible={isPasswordVisible}
                            handleVisiblePassword={handleVisiblePassword}
                            placeholder="Password"
                            returnKeyType="done"
                            secureText
                            onChangeText={(value) => field?.onChange(value)}
                        />
                    )}
                />
                {/* <TouchableOpacity onPress={form?.handleSubmit(handleLogin)}>
                    <Button mode="contained">
                        <Text variant="titleMedium" style={styles.textLogin}>
                            Login
                        </Text>
                    </Button>
                </TouchableOpacity> */}
            </View>

            <ToastComponent />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    sectionLogin: {
        padding: 16
    },
    label: {
        color: theme.colors.secondary
    },
    textLogin: {
        color: theme.colors.white,
        fontWeight: '700'
    },
    textRetail: {
        textAlign: 'center'
    },
    boxRetail: {
        padding: 16,
        alignSelf: 'center'
    },
    settingButton: {
        zIndex: 1,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
});

export default LoginScreen;
