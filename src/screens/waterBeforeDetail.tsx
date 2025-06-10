import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import InputText from '@src/components/core/inputeText';
import PopupCamera from '@src/components/core/popupCamera';
import PopupSaveData from '@src/components/core/popupSaveData';
import { CANCELCONTENTDIALOG } from '@src/constant';
import { GetLocations } from '@src/services/location';
import {
    GetWaterQualityBeforeById,
    UpdateWaterQualityBefore
} from '@src/services/saveData';
import { theme } from '@src/theme';
import { LocationResponse } from '@src/typings/location';
import { HistoryStackParamsList } from '@src/typings/navigation';
import { ListPopupData, SaveWaterBefore } from '@src/typings/saveData';
import FormData from 'form-data';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
    launchCamera,
    launchImageLibrary,
    MediaType
} from 'react-native-image-picker';

import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type WaterBeforeDetailScreenProps = NativeStackScreenProps<
    HistoryStackParamsList,
    'WaterBeforeDetail'
>;

const WaterBeforeDetailScreen: FC<WaterBeforeDetailScreenProps> = (props) => {
    const { top } = useSafeAreaInsets();
    const { route, navigation } = props;
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [textConfirm, setTextConfirm] = useState<string>('');
    const [textCancel, setTextCancel] = useState<string>('');
    const [showCloseDialog, setShowCloseDialog] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isCancelDialog, setIsCancelDialog] = useState<boolean>(false);
    const [selectLocation, setSelectLocation] = useState<string>('');
    const [popupSaveDataVisible, setPopupSaveDataVisible] = useState(false);
    const [listLocation, setListLocation] = useState<LocationResponse[]>([]);
    const [listPopupData, setListPopupData] = useState<ListPopupData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const clearStateDialog = useCallback(() => {
        setVisibleDialog(false);
        setTextConfirm('');
        setTextCancel('');
        setContentDialog('');
        setShowCloseDialog(false);
    }, []);

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

    const onClosePopupSaveData = () => {
        setPopupSaveDataVisible(!popupSaveDataVisible);
    };

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

    const handleCloseDialogCancel = useCallback(() => {
        clearStateDialog();
    }, [clearStateDialog]);

    const handlePressEdit = useCallback(() => {
        setIsEdit(true);
    }, []);

    const handlePressCancel = useCallback(() => {
        setVisibleDialog(true);
        setContentDialog(CANCELCONTENTDIALOG);
        setShowCloseDialog(true);
        setIsCancelDialog(true);
        setTextConfirm('ใช่');
        setTextCancel('ไม่ใช่');
    }, []);

    const handleDisableButton = useCallback((): boolean => {
        if (
            !selectLocation ||
            !form.watch('alkaline') ||
            !form.watch('ph') ||
            !form.watch('salinity')
        ) {
            return true;
        }
        return false;
    }, [form, selectLocation]);

    const renderItemLocation = (item: LocationResponse) => {
        return (
            <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText} variant="bodyLarge">
                    {item?.name}
                </Text>
            </View>
        );
    };

    const openImagePicker = (type: string) => {
        try {
            const options = {
                mediaType: 'photo' as MediaType
            };

            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('Image picker error: ', response.errorMessage);
                } else if (response?.assets && response?.assets?.length > 0) {
                    const uri = response.assets[0].uri;
                    switch (type) {
                        case 'salinity':
                            setSelectedImageSalinity(uri);
                            break;
                        case 'ph':
                            setSelectedImagePh(uri);
                            break;
                        case 'alkaline':
                            setSelectedImageAlkaline(uri);
                            break;
                        default:
                            break;
                    }
                }
            });
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog('Something went wrong image library launch');
        }
    };

    const handleCameraLaunch = async (type: String) => {
        try {
            const options = {
                mediaType: 'photo' as MediaType
            };
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'App Camera Permission',
                        message: 'App needs access to your camera ',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK'
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Camera permission given');
                    launchCamera(options, (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled camera');
                        } else if (response.errorCode) {
                            console.log(
                                'Camera Error: ',
                                response.errorMessage
                            );
                        } else if (
                            response?.assets &&
                            response?.assets?.length > 0
                        ) {
                            const uri = response.assets[0].uri;
                            switch (type) {
                                case 'salinity':
                                    setSelectedImageSalinity(uri);
                                    break;
                                case 'ph':
                                    setSelectedImagePh(uri);
                                    break;
                                case 'alkaline':
                                    setSelectedImageAlkaline(uri);
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                } else {
                    console.log('Camera permission denied');
                }
            } else {
                launchCamera(options, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled camera');
                    } else if (response.errorCode) {
                        console.log('Camera Error: ', response.errorMessage);
                    } else if (
                        response?.assets &&
                        response?.assets?.length > 0
                    ) {
                        const uri = response.assets[0].uri;
                        switch (type) {
                            case 'salinity':
                                setSelectedImageSalinity(uri);
                                break;
                            case 'ph':
                                setSelectedImagePh(uri);
                                break;
                            case 'alkaline':
                                setSelectedImageAlkaline(uri);
                                break;
                            default:
                                break;
                        }
                    }
                });
            }
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog('Something went wrong camera launch');
        }
    };

    const togglePopupSaveData = () => {
        const listData: ListPopupData[] = [];
        setPopupSaveDataVisible(!popupSaveDataVisible);

        const salinityValue = parseFloat(form.watch('salinity'));
        const phValue = parseFloat(form.watch('ph'));
        const alkalineValue = parseFloat(form.watch('alkaline'));

        // Salinity conditions
        if (salinityValue > 9) {
            listData.push({
                primary: 'ค่าความเค็ม',
                secondary: 'เหมาะสมเพาะฟักลูกปู'
            });
        } else if (salinityValue === 9) {
            listData.push({
                primary: 'เติมเกลือ',
                secondary: '5 กิโลกรัมเพื่อความเหมาะสมเพาะฟักลูกปู'
            });
        } else if (salinityValue === 8) {
            listData.push({
                primary: 'เติมเกลือ',
                secondary: '10 กิโลกรัมเพื่อความเหมาะสมเพาะฟักลูกปู'
            });
        } else {
            listData.push({
                primary: 'ค่าความเค็ม',
                secondary: 'ไม่เหมาะสมเพาะฟักลูกปู'
            });
        }

        // pH conditions
        if (phValue >= 7.5 && phValue <= 8.5) {
            listData.push({
                primary: 'ค่า pH',
                secondary: 'เหมาะสมเพาะฟักลูกปู'
            });
        } else if (phValue >= 7.0 && phValue <= 7.1) {
            listData.push({
                primary: 'เติมปูนขาว',
                secondary: '2 กิโลกรัมเพื่อความเหมาะสมเพาะฟักลูกปู'
            });
        } else if (phValue >= 7.2 && phValue <= 7.4) {
            listData.push({
                primary: 'เติมปูนขาว',
                secondary: '1 กิโลกรัมเพื่อความเหมาะสมเพาะฟักลูกปู'
            });
        } else if (phValue >= 8.6 && phValue <= 8.8) {
            listData.push({
                primary: 'เติมน้ำจืด',
                secondary: '500 ลิตรเพื่อความเหมาะสมเพาะฟักลูกปู'
            });
        } else if (phValue >= 8.9 && phValue <= 9.0) {
            listData.push({
                primary: 'เติมน้ำจืด',
                secondary: '1000 ลิตรเพื่อความเหมาะสมเพาะฟักลูกปู'
            });
        } else {
            listData.push({
                primary: 'ค่า pH',
                secondary: 'ไม่เหมาะสมเพาะฟักลูกปู'
            });
        }

        // Alkaline conditions
        if (alkalineValue < 100) {
            listData.push({
                primary: 'ค่าอัลคาไลน์',
                secondary: 'ไม่เหมาะสมเพาะฟักลูกปู'
            });
        } else if (alkalineValue >= 100 && alkalineValue <= 120) {
            listData.push({
                primary: 'เติมโซเดียมไบคาร์บอเนต',
                secondary: '720 กรัมเพื่อความเหมาะสมเพาะฟักลูกปู'
            });
        } else if (alkalineValue > 120 && alkalineValue <= 170) {
            listData.push({
                primary: 'ค่าอัลคาไลน์',
                secondary: 'เหมาะสมที่สุดเพาะฟักลูกปู'
            });
        } else if (alkalineValue >= 170) {
            listData.push({
                primary: 'ค่าอัลคาไลน์',
                secondary: 'เหมาะสมเพาะฟักลูกปู'
            });
        } else {
            listData.push({
                primary: 'ค่าอัลคาไลน์',
                secondary: 'ไม่เหมาะสมเพาะฟักลูกปู'
            });
        }

        setListPopupData(listData);
    };

    const handlePopupOnSave = async () => {
        try {
            setLoading(true);
            var formData = new FormData();
            formData.append('location', selectLocation);
            formData.append('salinity', form?.watch('salinity') || '');
            formData.append('ph', form?.watch('ph') || '');
            formData.append('alkaline', form?.watch('alkaline') || '');
            formData.append('id', route?.params?.id);
            if (selectedImageSalinity) {
                formData.append('salinityImg', {
                    uri: selectedImageSalinity,
                    name: 'salinityImg.jpg',
                    type: 'image/jpeg'
                });
            }
            if (selectedImagePh) {
                formData.append('phImg', {
                    uri: selectedImagePh,
                    name: 'phImg.jpg',
                    type: 'image/jpeg'
                });
            }
            if (selectedImageAlkaline) {
                formData.append('alkalineImg', {
                    uri: selectedImageAlkaline,
                    name: 'alkalineImg.jpg',
                    type: 'image/jpeg'
                });
            }

            const res = await UpdateWaterQualityBefore(formData);
            if (res?.status === 200) {
                navigation.goBack();
            } else {
                setLoading(false);
                setVisibleDialog(true);
                setContentDialog('Something went wrong save data');
                return;
            }
            setLoading(false);
            setPopupSaveDataVisible(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setVisibleDialog(true);
            setContentDialog('Something went wrong save data');
        }
    };

    const handleGetWaterQualityBefore = useCallback(async () => {
        try {
            clearStateDialog();
            const res = await GetWaterQualityBeforeById(route?.params?.id);
            if (res?.status === 200) {
                setSelectLocation(res?.data?.location);
                setSelectedImageAlkaline(res?.data?.alkalineImg);
                setSelectedImagePh(res?.data?.phImg);
                setSelectedImageSalinity(res?.data?.salinityImg);
                form.setValue('location', res?.data?.location || '');
                form.setValue('alkaline', res?.data?.alkaline || '');
                form.setValue('ph', res?.data?.ph || '');
                form.setValue('salinity', res?.data?.salinity || '');
            } else {
                setVisibleDialog(true);
                setContentDialog('Something went wrong get data');
                return;
            }
            setIsEdit(false);
        } catch (err) {
            console.log(err);
            setIsEdit(false);
            setVisibleDialog(true);
            setContentDialog('Something went wrong get data');
        }
    }, [clearStateDialog, form, route?.params?.id]);

    const handleInitDropdown = useCallback(async () => {
        try {
            const [responseLocation] = await Promise.all([GetLocations()]);
            setListLocation(responseLocation?.data);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
        }
    }, []);

    const handleConfirmDialogCancel = useCallback(() => {
        handleGetWaterQualityBefore();
    }, [handleGetWaterQualityBefore]);

    useEffect(() => {
        handleInitDropdown();
    }, [handleInitDropdown]);

    useEffect(() => {
        handleGetWaterQualityBefore();
    }, [handleGetWaterQualityBefore]);

    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <AlertDialog
                textContent={contentDialog}
                visible={visibleDialog}
                handleClose={() =>
                    isCancelDialog
                        ? handleCloseDialogCancel()
                        : handleCloseDialog()
                }
                handleConfirm={() =>
                    isCancelDialog
                        ? handleConfirmDialogCancel()
                        : handleCloseDialog()
                }
                showCloseDialog={showCloseDialog}
                textConfirm={textConfirm}
                textCancel={textCancel}
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
                    {isEdit ? (
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
                    ) : (
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
                                    onChangeText={(value) =>
                                        field?.onChange(value)
                                    }
                                    readOnly
                                />
                            )}
                        />
                    )}
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
                                picture={!isEdit}
                                camera={isEdit}
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly={isEdit ? false : true}
                            />
                        )}
                    />
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        ค่า pH
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
                                placeholder="ระบุค่า pH"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                picture={!isEdit}
                                camera={isEdit}
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly={isEdit ? false : true}
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
                                picture={!isEdit}
                                camera={isEdit}
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly={isEdit ? false : true}
                            />
                        )}
                    />
                    {isEdit ? (
                        <View style={styles.rowButton}>
                            <TouchableOpacity
                                disabled={handleDisableButton()}
                                style={[
                                    styles.buttonApply,
                                    {
                                        backgroundColor: handleDisableButton()
                                            ? theme.colors.textGray
                                            : theme.colors.gold
                                    }
                                ]}
                                onPress={togglePopupSaveData}
                            >
                                <Text
                                    variant="bodyLarge"
                                    style={styles.buttonText}
                                >
                                    บันทึกข้อมูล
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.buttonApply,
                                    {
                                        backgroundColor: theme.colors.gold
                                    }
                                ]}
                                onPress={handlePressCancel}
                            >
                                <Text
                                    variant="bodyLarge"
                                    style={styles.buttonText}
                                >
                                    ยกเลืก
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.rowEditButton}>
                            <TouchableOpacity
                                onPress={handlePressEdit}
                                style={[
                                    styles.buttonEdit,
                                    {
                                        backgroundColor: theme.colors.gold
                                    }
                                ]}
                            >
                                <Text
                                    variant="bodyLarge"
                                    style={styles.buttonText}
                                >
                                    แก้ไขข้อมูล
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>

            {isEdit ? (
                <>
                    <PopupSaveData
                        loading={loading}
                        onSave={handlePopupOnSave}
                        listData={listPopupData}
                        visible={popupSaveDataVisible}
                        onClose={onClosePopupSaveData}
                    />

                    <PopupCamera
                        selectedImage={selectedImageSalinity}
                        visible={popupCameraSalinityVisible}
                        onClose={togglePopupCameraSalinity}
                        type="salinity"
                        openImagePicker={openImagePicker}
                        handleCameraLaunch={handleCameraLaunch}
                    />
                    <PopupCamera
                        selectedImage={selectedImagePh}
                        visible={popupCameraPhVisible}
                        onClose={togglePopupCameraPh}
                        type="ph"
                        openImagePicker={openImagePicker}
                        handleCameraLaunch={handleCameraLaunch}
                    />
                    <PopupCamera
                        selectedImage={selectedImageAlkaline}
                        visible={popupCameraAlkalineVisible}
                        onClose={togglePopupCameraAlkaline}
                        type="alkaline"
                        openImagePicker={openImagePicker}
                        handleCameraLaunch={handleCameraLaunch}
                    />
                </>
            ) : (
                <>
                    <PopupSaveData
                        remark={true}
                        loading={loading}
                        onSave={handlePopupOnSave}
                        listData={listPopupData}
                        visible={popupSaveDataVisible}
                        onClose={onClosePopupSaveData}
                    />
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
                </>
            )}
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
    },
    dropdown: {
        height: 50,
        borderColor: theme.colors.borderAutocomplete,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: theme.colors.blackGray
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
    },
    rowButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    rowEditButton: {
        marginTop: 30
    },
    buttonEdit: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50
    },
    buttonText: {
        color: theme.colors.white
    },
    buttonApply: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default WaterBeforeDetailScreen;
