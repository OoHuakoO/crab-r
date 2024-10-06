import React, { FC, useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    View
} from 'react-native';

import InputText from '@src/components/core/inputeText';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Button from '@src/components/core/button';
import ToastComponent from '@src/components/core/toast';
import { STATUS_CODE } from '@src/constant';
import { ChangePassword } from '@src/services/login';
import { useSetRecoilState } from '@src/store';
import { toastState } from '@src/store/toast';
import { theme } from '@src/theme';
import { Toast } from '@src/typings/common';
import { ChangePasswordParams } from '@src/typings/login';
import { PublicStackParamsList } from '@src/typings/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ChangePasswordScreenProps = NativeStackScreenProps<
    PublicStackParamsList,
    'ChangePassword'
>;

const ChangePasswordScreen: FC<ChangePasswordScreenProps> = (props) => {
    const { navigation } = props;
    const { top } = useSafeAreaInsets();
    const form = useForm<ChangePasswordParams>({
        mode: 'onChange'
    });
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState<boolean>(false);
    const setToast = useSetRecoilState<Toast>(toastState);
    const [error, setError] = useState<boolean>(false);

    const handleChangePassword = useCallback(
        async (data: ChangePasswordParams) => {
            try {
                setLoading(true);
                const response = await ChangePassword({
                    token: data?.token,
                    password: data?.password
                });
                if (response?.status !== STATUS_CODE.CODE_200) {
                    setLoading(false);
                    setVisibleDialog(true);
                    setContentDialog('Something went wrong change password');
                    return;
                }
                navigation.navigate('Login');
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setVisibleDialog(true);
                setContentDialog(`Something went wrong change password`);
            }
        },
        [navigation]
    );

    const handleSetError = useCallback(() => {
        if (
            form?.watch('password') === '' &&
            form?.watch('confirmPassword') === ''
        ) {
            setError(false);
            return;
        }
        if (form?.watch('password') !== form?.watch('confirmPassword')) {
            setError(true);
            return;
        }
        setError(false);
    }, [form]);

    const handleVisiblePassword = useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    const handleVisibleConfirmPassword = useCallback(() => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }, [isConfirmPasswordVisible]);

    const handleCloseDialog = () => {
        setVisibleDialog(false);
    };

    useEffect(() => {
        setTimeout(() => {
            setToast({
                open: true,
                text: 'Send Verification Code To Email Successfully'
            });
        }, 0);
    }, [setToast]);

    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <AlertDialog
                visible={visibleDialog}
                textContent={contentDialog}
                handleClose={handleCloseDialog}
                handleConfirm={handleCloseDialog}
            />

            <View style={styles.sectionLogin}>
                <View style={styles.imagesContainer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/carbRIcon.png')}
                        resizeMode="contain"
                    />
                </View>
                <Controller
                    name="token"
                    defaultValue=""
                    control={form?.control}
                    render={({ field }) => (
                        <InputText
                            {...field}
                            placeholder="Verification Code"
                            returnKeyType="next"
                            autoCapitalize="none"
                            textContentType="none"
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
                            borderColor={error ? theme.colors.error : 'gray'}
                            onChangeText={(value) => {
                                field?.onChange(value);
                                handleSetError();
                            }}
                        />
                    )}
                />

                <Controller
                    name="confirmPassword"
                    defaultValue=""
                    control={form?.control}
                    render={({ field }) => (
                        <InputText
                            {...field}
                            isPasswordVisible={isConfirmPasswordVisible}
                            handleVisiblePassword={handleVisibleConfirmPassword}
                            placeholder="Confirm Password"
                            returnKeyType="done"
                            secureText
                            borderColor={error ? theme.colors.error : 'gray'}
                            onChangeText={(value) => {
                                field?.onChange(value);
                                handleSetError();
                            }}
                        />
                    )}
                />

                {error && (
                    <View style={styles.boxTextError}>
                        <Text variant="titleMedium" style={styles.textError}>
                            รหัสผ่านไม่ตรงกัน
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    onPress={form?.handleSubmit(handleChangePassword)}
                >
                    <Button mode="contained" isDisabled={error}>
                        {loading ? (
                            <ActivityIndicator
                                size="small"
                                color={theme.colors.white}
                            />
                        ) : (
                            <Text style={styles.textLogin}>
                                เปลี่ยนรหัสผ่าน
                            </Text>
                        )}
                    </Button>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={error}
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Button mode="text">
                        <Text variant="titleMedium" style={styles.textRegister}>
                            กลับไปหน้าล็อกอิน
                        </Text>
                    </Button>
                </TouchableOpacity>
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
    },
    boxTextError: {
        marginBottom: 10,
        marginTop: -10
    },
    textError: {
        fontFamily: 'K2D-Medium',
        color: theme.colors.error,
        fontSize: 15
    }
});

export default ChangePasswordScreen;
