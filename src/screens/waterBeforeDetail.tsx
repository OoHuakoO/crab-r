import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import InputText from '@src/components/core/inputeText';
import PopupCamera from '@src/components/core/popupCamera';
import { GetWaterQualityBeforeById } from '@src/services/saveData';
import { theme } from '@src/theme';
import { HistoryStackParamsList } from '@src/typings/navigation';
import { SaveWaterBefore } from '@src/typings/saveData';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';

type WaterBeforeDetailScreenProps = NativeStackScreenProps<
    HistoryStackParamsList,
    'WaterBeforeDetail'
>;

const WaterBeforeDetailScreen: FC<WaterBeforeDetailScreenProps> = (props) => {
    const { route } = props;
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');

    const [popupCameraSalinityVisible, setPopupCameraSalinityVisible] =
        useState(false);
    const [popupCameraPhVisible, setPopupCameraPhVisible] = useState(false);
    const [popupCameraAlkalineVisible, setPopupCameraAlkalineVisible] =
        useState(false);
    const [selectedImageSalinity, setSelectedImageSalinity] = useState<
        string | null
    >(null);
    const [selectedImagePh, setSelectedImagePh] = useState<string | null>(null);
    const [selectedImageAlkaline, setSelectedImageAlkaline] = useState<
        string | null
    >(null);

    const form = useForm<SaveWaterBefore>({});

    const togglePopupCameraSalinity = () => {
        setPopupCameraSalinityVisible(!popupCameraSalinityVisible);
    };

    const togglePopupCameraPh = () => {
        setPopupCameraPhVisible(!popupCameraPhVisible);
    };

    const togglePopupCameraAlkaline = () => {
        setPopupCameraAlkalineVisible(!popupCameraAlkalineVisible);
    };

    const handleCloseDialog = useCallback(() => {
        setVisibleDialog(false);
    }, []);

    const handleGetWaterQualityBefore = useCallback(async () => {
        try {
            const res = await GetWaterQualityBeforeById(route?.params?.id);
            if (res?.status === 200) {
                setSelectedImageAlkaline(res?.data?.alkalineImg);
                setSelectedImagePh(res?.data?.phImg);
                setSelectedImageSalinity(res?.data?.salinityImg);
                form.setValue('location', res?.data?.location || '');
                form.setValue('pool', res?.data?.pool || '');
                form.setValue('alkaline', res?.data?.alkaline || '');
                form.setValue('ph', res?.data?.ph || '');
                form.setValue('salinity', res?.data?.salinity || '');
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
        handleGetWaterQualityBefore();
    }, [handleGetWaterQualityBefore]);

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
                    image={require('../../assets/images/saveWaterBeforeIcon.png')}
                    textTitle={`ประวัติบันทึกข้อมูลคุณภาพน้ำก่อนเข้าบ่อพัก`}
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
                        ค่าความเค็ม
                    </Text>
                    <Controller
                        name="salinity"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                handleTogglePopupCamera={
                                    togglePopupCameraSalinity
                                }
                                marginBottomContainer={1}
                                placeholder="ระบุค่าความเค็ม"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                picture
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly
                            />
                        )}
                    />
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        ค่า PH
                    </Text>
                    <Controller
                        name="ph"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                handleTogglePopupCamera={togglePopupCameraPh}
                                marginBottomContainer={1}
                                placeholder="ระบุค่า PH"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                picture
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly
                            />
                        )}
                    />
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        ค่าอัลคาไลน์
                    </Text>
                    <Controller
                        name="alkaline"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                handleTogglePopupCamera={
                                    togglePopupCameraAlkaline
                                }
                                marginBottomContainer={1}
                                placeholder="ระบุค่าอัลคาไลน์"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                picture
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly
                            />
                        )}
                    />
                </View>
            </ScrollView>
            <PopupCamera
                viewImage
                selectedImage={selectedImageSalinity}
                visible={popupCameraSalinityVisible}
                onClose={togglePopupCameraSalinity}
                type="salinity"
            />
            <PopupCamera
                viewImage
                selectedImage={selectedImagePh}
                visible={popupCameraPhVisible}
                onClose={togglePopupCameraPh}
                type="ph"
            />
            <PopupCamera
                viewImage
                selectedImage={selectedImageAlkaline}
                visible={popupCameraAlkalineVisible}
                onClose={togglePopupCameraAlkaline}
                type="alkaline"
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

export default WaterBeforeDetailScreen;
