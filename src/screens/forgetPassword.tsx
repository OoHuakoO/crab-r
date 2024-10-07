import React, { FC, useCallback, useState } from 'react';
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
import { STATUS_CODE } from '@src/constant';
import { ForgetPassword } from '@src/services/login';
import { theme } from '@src/theme';
import { ForgetPasswordParams } from '@src/typings/login';
import { PublicStackParamsList } from '@src/typings/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ForgetPasswordScreenProps = NativeStackScreenProps<
    PublicStackParamsList,
    'ForgetPassword'
>;

const ForgetPasswordScreen: FC<ForgetPasswordScreenProps> = (props) => {
    const { navigation } = props;
    const { top } = useSafeAreaInsets();
    const form = useForm<ForgetPasswordParams>({});
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleForgetPassword = useCallback(
        async (data: ForgetPasswordParams) => {
            try {
                setLoading(true);
                const response = await ForgetPassword({
                    email: data?.email
                });
                if (response?.status !== STATUS_CODE.CODE_200) {
                    setLoading(false);
                    setVisibleDialog(true);
                    setContentDialog('Something went wrong forget password');
                    return;
                }
                navigation.navigate('ChangePassword');
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setVisibleDialog(true);
                setContentDialog(`Something went wrong forget password`);
            }
        },
        [navigation]
    );

    const handleCloseDialog = () => {
        setVisibleDialog(false);
    };

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

                <TouchableOpacity
                    onPress={form?.handleSubmit(handleForgetPassword)}
                >
                    <Button mode="contained">
                        {loading ? (
                            <ActivityIndicator
                                size="small"
                                color={theme.colors.white}
                            />
                        ) : (
                            <Text style={styles.textLogin}>ลืมรหัสผ่าน</Text>
                        )}
                    </Button>
                </TouchableOpacity>

                <TouchableOpacity
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

export default ForgetPasswordScreen;
