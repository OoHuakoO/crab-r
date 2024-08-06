import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import InputText from '@src/components/core/inputeText';
import { GetCrabHatchById } from '@src/services/saveData';
import { theme } from '@src/theme';
import { HistoryStackParamsList } from '@src/typings/navigation';
import { SaveCrabHatch } from '@src/typings/saveData';
import { parseDateString } from '@src/utils/time-manager';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';

type CrabHatchDetailScreenProps = NativeStackScreenProps<
    HistoryStackParamsList,
    'WaterAfterDetail'
>;

const CrabHatchDetailScreen: FC<CrabHatchDetailScreenProps> = (props) => {
    const { route } = props;
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');

    const form = useForm<SaveCrabHatch>({});

    const handleCloseDialog = useCallback(() => {
        setVisibleDialog(false);
    }, []);

    const handleGetCrabHatch = useCallback(async () => {
        try {
            const res = await GetCrabHatchById(route?.params?.id);
            if (res?.status === 200) {
                form.setValue('location', res?.data?.location || '');
                form.setValue('pool', res?.data?.pool || '');
                form.setValue('crabEggColor', res?.data?.crabEggColor || '');
                form.setValue(
                    'crabEggScoopDate',
                    parseDateString(res?.data?.crabEggScoopDate?.toString()) ||
                        ''
                );
                form.setValue(
                    'crabReleaseDate',
                    parseDateString(res?.data?.crabReleaseDate.toString()) || ''
                );
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
    }, [form, route?.params?.id]);

    useEffect(() => {
        handleGetCrabHatch();
    }, [handleGetCrabHatch]);

    return (
        <SafeAreaView style={styles.container}>
            <AlertDialog
                textContent={contentDialog}
                visible={visibleDialog}
                handleClose={handleCloseDialog}
                handleConfirm={handleCloseDialog}
            />
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/saveCrabHatchIcon.png')}
                    textTitle={`ประวัติบันทึกข้อมูล\nการเพาะฟัก`}
                    fontSizeTextTitle={24}
                />
                <View style={styles.containerInput}>
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        สถานที่
                    </Text>
                    <Controller
                        name="location"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                marginBottomContainer={1}
                                placeholder="ระบุสถานที่"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly
                            />
                        )}
                    />
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        บ่อที่
                    </Text>
                    <Controller
                        name="pool"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                marginBottomContainer={1}
                                placeholder="ระบุบ่อ"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly
                            />
                        )}
                    />
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        สีไข่ปู
                    </Text>
                    <Controller
                        name="crabEggColor"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                marginBottomContainer={1}
                                placeholder="ระบุค่าสีไข่ปู"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly
                            />
                        )}
                    />
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        วันเขี่ยไข่ปู
                    </Text>
                    <Controller
                        name="crabEggScoopDate"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                marginBottomContainer={1}
                                placeholder="ระบุวันเขี่ยไข่ปู"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly
                            />
                        )}
                    />
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        วันปล่อยลูกปู
                    </Text>
                    <Controller
                        name="crabReleaseDate"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                marginBottomContainer={1}
                                placeholder="ระบุวันปล่อยลูกปู"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly
                            />
                        )}
                    />
                </View>
            </ScrollView>
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
        marginTop: 80
    },
    containerInput: {
        marginHorizontal: 25,
        marginBottom: 50
    },
    textTitle: {
        fontSize: 16,
        color: theme.colors.white,
        marginVertical: 10
    }
});

export default CrabHatchDetailScreen;
