import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import InputText from '@src/components/core/inputeText';
import PopupCamera from '@src/components/core/popupCamera';
import { GetWaterQualityAfterById } from '@src/services/saveData';
import { theme } from '@src/theme';
import { HistoryStackParamsList } from '@src/typings/navigation';
import { SaveWaterAfter } from '@src/typings/saveData';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type WaterAfterDetailScreenProps = NativeStackScreenProps<
    HistoryStackParamsList,
    'WaterAfterDetail'
>;

const WaterAfterDetailScreen: FC<WaterAfterDetailScreenProps> = (props) => {
    const { top } = useSafeAreaInsets();
    const { route } = props;
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');

    const [popupCameraAmmoniaVisible, setPopupCameraAmmoniaVisible] =
        useState(false);
    const [popupCameraCalciumVisible, setPopupCameraCalciumVisible] =
        useState(false);
    const [popupCameraMagnesiumVisible, setPopupCameraMagnesiumVisible] =
        useState(false);
    const [selectedImageAmmonia, setSelectedImageAmmonia] = useState<
        string | null
    >(null);
    const [selectedImageCalcium, setSelectedImageCalcium] = useState<
        string | null
    >(null);
    const [selectedImageMagnesium, setSelectedImageMagnesium] = useState<
        string | null
    >(null);

    const form = useForm<SaveWaterAfter>({});

    const togglePopupCameraAmmonia = () => {
        setPopupCameraAmmoniaVisible(!popupCameraAmmoniaVisible);
    };

    const togglePopupCameraCalcium = () => {
        setPopupCameraCalciumVisible(!popupCameraCalciumVisible);
    };

    const togglePopupCameraMagnesium = () => {
        setPopupCameraMagnesiumVisible(!popupCameraMagnesiumVisible);
    };

    const handleCloseDialog = useCallback(() => {
        setVisibleDialog(false);
    }, []);

    const handleGetWaterQualityAfter = useCallback(async () => {
        try {
            const res = await GetWaterQualityAfterById(route?.params?.id);
            if (res?.status === 200) {
                setSelectedImageAmmonia(res?.data?.ammoniaImg);
                setSelectedImageCalcium(res?.data?.calciumImg);
                setSelectedImageMagnesium(res?.data?.magnesiumImg);
                form.setValue('location', res?.data?.location || '');
                form.setValue('pool', res?.data?.pool || '');
                form.setValue('ammonia', res?.data?.ammonia || '');
                form.setValue('calcium', res?.data?.calcium || '');
                form.setValue('magnesium', res?.data?.magnesium || '');
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
        handleGetWaterQualityAfter();
    }, [handleGetWaterQualityAfter]);

    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
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
                        ค่าแอมโมเนีย
                    </Text>
                    <Controller
                        name="ammonia"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                handleTogglePopupCamera={
                                    togglePopupCameraAmmonia
                                }
                                marginBottomContainer={1}
                                placeholder="ระบุค่าแอมโมเนีย"
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
                        ค่าแคลเซียม
                    </Text>
                    <Controller
                        name="calcium"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                handleTogglePopupCamera={
                                    togglePopupCameraCalcium
                                }
                                marginBottomContainer={1}
                                placeholder="ระบุค่าแคลเซียม"
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
                        ค่าแมกนีเซียม
                    </Text>
                    <Controller
                        name="magnesium"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                handleTogglePopupCamera={
                                    togglePopupCameraMagnesium
                                }
                                marginBottomContainer={1}
                                placeholder="ระบุค่าแมกนีเซียม"
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
                selectedImage={selectedImageAmmonia}
                visible={popupCameraAmmoniaVisible}
                onClose={togglePopupCameraAmmonia}
                type="ammonia"
            />
            <PopupCamera
                viewImage
                selectedImage={selectedImageCalcium}
                visible={popupCameraCalciumVisible}
                onClose={togglePopupCameraCalcium}
                type="calcium"
            />
            <PopupCamera
                viewImage
                selectedImage={selectedImageMagnesium}
                visible={popupCameraMagnesiumVisible}
                onClose={togglePopupCameraMagnesium}
                type="magnesium"
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

export default WaterAfterDetailScreen;
