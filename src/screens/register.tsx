import React, { FC, useCallback, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

import InputText from '@src/components/core/inputeText';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Button from '@src/components/core/button';
import { STATUS_CODE } from '@src/constant';
import { Register } from '@src/services/login';
import { loginState, useSetRecoilState } from '@src/store';
import { theme } from '@src/theme';
import { LoginState } from '@src/typings/common';
import { LoginParams } from '@src/typings/login';
import { PublicStackParamsList } from '@src/typings/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet } from 'react-native';
import { Portal, Text } from 'react-native-paper';

type RegisterScreenProps = NativeStackScreenProps<
    PublicStackParamsList,
    'Register'
>;

const RegisterScreen: FC<RegisterScreenProps> = (props) => {
    const { navigation } = props;
    const setLogin = useSetRecoilState<LoginState>(loginState);
    const form = useForm<LoginParams>({});
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const handleRegister = useCallback(
        async (data: LoginParams) => {
            try {
                const FcmTokenValue = await AsyncStorage.getItem('FcmToken');
                const FcmTokenJson = JSON.parse(FcmTokenValue);
                const response = await Register({
                    email: data?.email,
                    password: data?.password,
                    fcmToken: FcmTokenJson
                });
                if (response?.status !== STATUS_CODE.CODE_200) {
                    setVisibleDialog(true);
                    setContentDialog('User already exist');
                    return;
                }
                const loginObj = {
                    role: response?.data?.role,
                    token: response?.data?.token
                };
                setLogin(loginObj);
                await AsyncStorage.setItem('Login', JSON.stringify(loginObj));
            } catch (err) {
                console.log(err);
                setVisibleDialog(true);
                setContentDialog(`Something went wrong register`);
            }
        },
        [setLogin]
    );

    const handleVisiblePassword = useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    const handleCloseDialog = () => {
        setVisibleDialog(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Portal>
                <AlertDialog
                    visible={visibleDialog}
                    textContent={contentDialog}
                    handleClose={handleCloseDialog}
                    handleConfirm={handleCloseDialog}
                />
            </Portal>
            <View style={styles.sectionLogin}>
                <View style={styles.imagesContainer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/carbRIcon.png')}
                        resizeMode="contain"
                    />
                </View>
                <Controller
                    name="email"
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
                <TouchableOpacity onPress={form?.handleSubmit(handleRegister)}>
                    <Button mode="contained">
                        <Text style={styles.textLogin}>สมัครสมาชิก</Text>
                    </Button>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Button mode="text">
                        <Text variant="titleMedium" style={styles.textRegister}>
                            ลงชื่อเข้าใช้
                        </Text>
                    </Button>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionLogin: {
        paddingHorizontal: 50,
        paddingTop: 50
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    imagesContainer: {
        width: 150,
        height: 150,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 20
    },
    label: {
        color: theme.colors.secondary
    },
    textLogin: {
        fontFamily: 'K2D-Medium',
        color: theme.colors.white,
        fontSize: 15
    },
    textRegister: {
        fontFamily: 'K2D-Medium',
        color: theme.colors.textGray,
        fontSize: 15
    }
});

export default RegisterScreen;
