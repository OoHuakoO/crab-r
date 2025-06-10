import React, { FC, useCallback, useEffect, useState } from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';

import InputText from '@src/components/core/inputeText';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Button from '@src/components/core/button';
import { STATUS_CODE } from '@src/constant';
import { GetLocations } from '@src/services/location';
import { Register } from '@src/services/login';
import { loginState, useSetRecoilState } from '@src/store';
import { theme } from '@src/theme';
import { LoginState } from '@src/typings/common';
import { LocationResponse } from '@src/typings/location';
import { LoginParams } from '@src/typings/login';
import { PublicStackParamsList } from '@src/typings/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RegisterScreenProps = NativeStackScreenProps<
    PublicStackParamsList,
    'Register'
>;

const RegisterScreen: FC<RegisterScreenProps> = (props) => {
    const { top } = useSafeAreaInsets();
    const { navigation } = props;
    const setLogin = useSetRecoilState<LoginState>(loginState);
    const form = useForm<LoginParams>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            location: '',
            name: '',
            surname: '',
            phone: ''
        }
    });
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [listLocation, setListLocation] = useState<LocationResponse[]>([]);
    const [selectLocation, setSelectLocation] = useState<string>('');

    const renderItemLocation = (item: LocationResponse) => {
        return (
            <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText} variant="bodyLarge">
                    {item?.name}
                </Text>
            </View>
        );
    };

    const handleRegister = useCallback(
        async (data: LoginParams) => {
            try {
                const FcmTokenValue = await AsyncStorage.getItem('FcmToken');
                const FcmTokenJson = JSON.parse(FcmTokenValue);
                const response = await Register({
                    email: data?.email,
                    password: data?.password,
                    name: data?.name,
                    surname: data?.surname,
                    phone: data?.phone,
                    location: selectLocation,
                    fcmToken: FcmTokenJson,
                    platform: Platform.OS
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
        [selectLocation, setLogin]
    );

    const handleVisiblePassword = useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    const handleCloseDialog = () => {
        setVisibleDialog(false);
    };

    const handleInitDropdown = useCallback(async () => {
        try {
            const responseLocation = await GetLocations();
            setListLocation(responseLocation?.data);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
        }
    }, []);

    useEffect(() => {
        handleInitDropdown();
    }, [handleInitDropdown]);

    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <ScrollView>
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
                        rules={{
                            required: 'กรุณากรอกอีเมล',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'รูปแบบอีเมลไม่ถูกต้อง'
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <InputText
                                    {...field}
                                    placeholder="Email"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    textContentType="emailAddress"
                                    keyboardType="email-address"
                                    borderColor={
                                        error ? theme.colors.error : 'gray'
                                    }
                                    errorText={error && error.message}
                                    onChangeText={(value) => {
                                        field?.onChange(value);
                                    }}
                                />
                            </>
                        )}
                    />
                    <Controller
                        name="password"
                        defaultValue=""
                        rules={{
                            required: 'กรุณากรอก Password'
                        }}
                        control={form?.control}
                        render={({ field, fieldState: { error } }) => (
                            <InputText
                                {...field}
                                isPasswordVisible={isPasswordVisible}
                                handleVisiblePassword={handleVisiblePassword}
                                placeholder="Password"
                                returnKeyType="done"
                                secureText
                                borderColor={
                                    error ? theme.colors.error : 'gray'
                                }
                                errorText={error && error.message}
                                onChangeText={(value) => field?.onChange(value)}
                            />
                        )}
                    />
                    <Controller
                        name="name"
                        defaultValue=""
                        rules={{
                            required: 'กรุณากรอกชื่อ'
                        }}
                        control={form?.control}
                        render={({ field, fieldState: { error } }) => (
                            <InputText
                                {...field}
                                placeholder="ชื่อ"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                borderColor={
                                    error ? theme.colors.error : 'gray'
                                }
                                errorText={error && error.message}
                                onChangeText={(value) => field?.onChange(value)}
                            />
                        )}
                    />
                    <Controller
                        name="surname"
                        defaultValue=""
                        rules={{
                            required: 'กรุณากรอกนามสกุล'
                        }}
                        control={form?.control}
                        render={({ field, fieldState: { error } }) => (
                            <InputText
                                {...field}
                                placeholder="นามสกุล"
                                returnKeyType="next"
                                autoCapitalize="none"
                                borderColor={
                                    error ? theme.colors.error : 'gray'
                                }
                                errorText={error && error.message}
                                textContentType="none"
                                onChangeText={(value) => field?.onChange(value)}
                            />
                        )}
                    />
                    <Controller
                        name="phone"
                        defaultValue=""
                        rules={{
                            required: 'กรุณากรอกเบอร์โทรศัพท์'
                        }}
                        control={form?.control}
                        render={({ field, fieldState: { error } }) => (
                            <InputText
                                {...field}
                                placeholder="เบอร์โทรศัพท์"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="telephoneNumber"
                                borderColor={
                                    error ? theme.colors.error : 'gray'
                                }
                                errorText={error && error.message}
                                keyboardType="phone-pad"
                                onChangeText={(value) => field?.onChange(value)}
                            />
                        )}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={listLocation}
                        maxHeight={300}
                        labelField="name"
                        valueField="name"
                        placeholder={'เลือกสถานที่'}
                        value={selectLocation}
                        onChange={(item) => {
                            setSelectLocation(item?.name);
                        }}
                        renderItem={renderItemLocation}
                    />
                    <TouchableOpacity
                        disabled={!form.formState.isValid || !selectLocation}
                        onPress={form?.handleSubmit(handleRegister)}
                    >
                        <Button
                            isDisabled={
                                !form.formState.isValid || !selectLocation
                            }
                            mode="contained"
                        >
                            <Text style={styles.textLogin}>สมัครสมาชิก</Text>
                        </Button>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                    >
                        <Button mode="text">
                            <Text
                                variant="titleMedium"
                                style={styles.textRegister}
                            >
                                ลงชื่อเข้าใช้
                            </Text>
                        </Button>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    dropdown: {
        height: 50,
        borderColor: theme.colors.borderAutocomplete,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: theme.colors.blackGray,
        marginBottom: 30
    },
    placeholderStyle: {
        fontFamily: 'K2D-Regular',
        fontSize: 16,
        color: theme.colors.textBody
    },
    selectedTextStyle: {
        fontSize: 16,
        color: theme.colors.blackGray,
        fontFamily: 'K2D-Regular'
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: theme.colors.blackGray,
        fontFamily: 'K2D-Regular'
    },
    dropdownItem: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dropdownItemText: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.blackGray,
        fontFamily: 'K2D-Regular'
    }
});

export default RegisterScreen;
