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
    GetWaterQualityAfterById,
    UpdateWaterQualityAfter
} from '@src/services/saveData';
import { theme } from '@src/theme';
import { LocationResponse } from '@src/typings/location';
import { HistoryStackParamsList } from '@src/typings/navigation';
import { ListPopupData, SaveWaterAfter } from '@src/typings/saveData';
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

type WaterAfterDetailScreenProps = NativeStackScreenProps<
    HistoryStackParamsList,
    'WaterAfterDetail'
>;

const WaterAfterDetailScreen: FC<WaterAfterDetailScreenProps> = (props) => {
    const { top } = useSafeAreaInsets();
    const { route, navigation } = props;
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [textConfirm, setTextConfirm] = useState<string>('');
    const [textCancel, setTextCancel] = useState<string>('');
    const [showCloseDialog, setShowCloseDialog] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [listLocation, setListLocation] = useState<LocationResponse[]>([]);
    const [selectLocation, setSelectLocation] = useState<string>('');
    const [listPopupData, setListPopupData] = useState<ListPopupData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isCancelDialog, setIsCancelDialog] = useState<boolean>(false);
    const [popupSaveDataVisible, setPopupSaveDataVisible] = useState(false);

    const clearStateDialog = useCallback(() => {
        setVisibleDialog(false);
        setTextConfirm('');
        setTextCancel('');
        setContentDialog('');
        setShowCloseDialog(false);
    }, []);

    const [popupCameraChlorineVisible, setPopupCameraChlorineVisible] =
        useState(false);
    const [popupCameraAmmoniaVisible, setPopupCameraAmmoniaVisible] =
        useState(false);
    const [popupCameraCalciumVisible, setPopupCameraCalciumVisible] =
        useState(false);
    const [popupCameraMagnesiumVisible, setPopupCameraMagnesiumVisible] =
        useState(false);

    const [selectedImageChlorine, setSelectedImageChlorine] = useState<
        string | null
    >(null);
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

    const onClosePopupSaveData = () => {
        setPopupSaveDataVisible(!popupSaveDataVisible);
    };

    const togglePopupCameraChlorine = () => {
        setPopupCameraChlorineVisible(!popupCameraChlorineVisible);
    };

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
            !form.watch('chlorine') ||
            !form.watch('ammonia') ||
            !form.watch('calcium') ||
            !form.watch('magnesium')
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
                        case 'chlorine':
                            setSelectedImageChlorine(uri);
                            break;
                        case 'ammonia':
                            setSelectedImageAmmonia(uri);
                            break;
                        case 'calcium':
                            setSelectedImageCalcium(uri);
                            break;
                        case 'magnesium':
                            setSelectedImageMagnesium(uri);
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
                                case 'chlorine':
                                    setSelectedImageChlorine(uri);
                                    break;
                                case 'ammonia':
                                    setSelectedImageAmmonia(uri);
                                    break;
                                case 'calcium':
                                    setSelectedImageCalcium(uri);
                                    break;
                                case 'magnesium':
                                    setSelectedImageMagnesium(uri);
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
                    } else {
                        const uri = response.assets[0].uri;
                        switch (type) {
                            case 'chlorine':
                                setSelectedImageChlorine(uri);
                                break;
                            case 'ammonia':
                                setSelectedImageAmmonia(uri);
                                break;
                            case 'calcium':
                                setSelectedImageCalcium(uri);
                                break;
                            case 'magnesium':
                                setSelectedImageMagnesium(uri);
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

        const chlorineValue = parseFloat(form.watch('chlorine'));
        const ammoniaValue = parseFloat(form.watch('ammonia'));
        const calciumValue = parseFloat(form.watch('calcium'));
        const magnesiumValue = parseFloat(form.watch('magnesium'));

        // Salinity conditions
        if (chlorineValue === 0) {
            listData.push({
                primary: 'ค่าคลอรีน',
                secondary: 'เหมาะสมเพาะฟักลูกปู'
            });
        } else {
            listData.push({
                primary: 'ค่าคลอรีน',
                secondary: 'ไม่เหมาะสมเพาะฟักลูกปู'
            });
        }

        listData.push({
            primary: 'ค่าแอมโมเนีย',
            secondary: `${ammoniaValue} mg/L *`
        });

        listData.push({
            primary: 'ค่าแคลเซียม',
            secondary: `${calciumValue} mg/L *`
        });

        listData.push({
            primary: 'ค่าแมกนีเซียม',
            secondary: `${magnesiumValue} mg/L *`
        });

        setListPopupData(listData);
    };

    const handlePopupOnSave = async () => {
        try {
            setLoading(true);
            var formData = new FormData();
            formData.append('location', selectLocation);
            formData.append('chlorine', form?.watch('chlorine') || '');
            formData.append('ammonia', form?.watch('ammonia') || '');
            formData.append('calcium', form?.watch('calcium') || '');
            formData.append('magnesium', form?.watch('magnesium') || '');
            formData.append('id', route?.params?.id);
            if (selectedImageChlorine) {
                formData.append('chlorineImg', {
                    uri: selectedImageChlorine,
                    name: 'chlorineImg.jpg',
                    type: 'image/jpeg'
                });
            }
            if (selectedImageAmmonia) {
                formData.append('ammoniaImg', {
                    uri: selectedImageAmmonia,
                    name: 'ammoniaImg.jpg',
                    type: 'image/jpeg'
                });
            }
            if (selectedImageCalcium) {
                formData.append('calciumImg', {
                    uri: selectedImageCalcium,
                    name: 'calciumImg.jpg',
                    type: 'image/jpeg'
                });
            }
            if (selectedImageMagnesium) {
                formData.append('magnesiumImg', {
                    uri: selectedImageMagnesium,
                    name: 'magnesiumImg.jpg',
                    type: 'image/jpeg'
                });
            }

            const res = await UpdateWaterQualityAfter(formData);
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

    const handleInitDropdown = useCallback(async () => {
        try {
            const [responseLocation] = await Promise.all([GetLocations()]);
            setListLocation(responseLocation?.data);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
        }
    }, []);

    const handleGetWaterQualityAfter = useCallback(async () => {
        try {
            clearStateDialog();
            const res = await GetWaterQualityAfterById(route?.params?.id);
            if (res?.status === 200) {
                setSelectLocation(res?.data?.location);
                setSelectedImageChlorine(res?.data?.chlorineImg);
                setSelectedImageAmmonia(res?.data?.ammoniaImg);
                setSelectedImageCalcium(res?.data?.calciumImg);
                setSelectedImageMagnesium(res?.data?.magnesiumImg);
                form.setValue('location', res?.data?.location || '');
                form.setValue('chlorine', res?.data?.chlorine || '');
                form.setValue('ammonia', res?.data?.ammonia || '');
                form.setValue('calcium', res?.data?.calcium || '');
                form.setValue('magnesium', res?.data?.magnesium || '');
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

    const handleConfirmDialogCancel = useCallback(() => {
        handleGetWaterQualityAfter();
    }, [handleGetWaterQualityAfter]);

    useEffect(() => {
        handleInitDropdown();
    }, [handleInitDropdown]);

    useEffect(() => {
        handleGetWaterQualityAfter();
    }, [handleGetWaterQualityAfter]);

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
                    textTitle={`ประวัติบันทึกข้อมูลคุณภาพน้ำหลังการพักน้ำได้ 3 วัน`}
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
                        ค่าคลอลีน
                    </Text>
                    <Controller
                        name="chlorine"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                handleTogglePopupCamera={
                                    togglePopupCameraChlorine
                                }
                                marginBottomContainer={1}
                                placeholder="ระบุค่าคลอลีน"
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
                                picture={!isEdit}
                                camera={isEdit}
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly={isEdit ? false : true}
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
                                picture={!isEdit}
                                camera={isEdit}
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly={isEdit ? false : true}
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
            <PopupSaveData
                remark={true}
                loading={loading}
                onSave={handlePopupOnSave}
                listData={listPopupData}
                visible={popupSaveDataVisible}
                onClose={onClosePopupSaveData}
            />
            {isEdit ? (
                <>
                    <PopupCamera
                        selectedImage={selectedImageChlorine}
                        visible={popupCameraChlorineVisible}
                        onClose={togglePopupCameraChlorine}
                        type="chlorine"
                        openImagePicker={openImagePicker}
                        handleCameraLaunch={handleCameraLaunch}
                    />
                    <PopupCamera
                        selectedImage={selectedImageAmmonia}
                        visible={popupCameraAmmoniaVisible}
                        onClose={togglePopupCameraAmmonia}
                        type="ammonia"
                        openImagePicker={openImagePicker}
                        handleCameraLaunch={handleCameraLaunch}
                    />
                    <PopupCamera
                        selectedImage={selectedImageCalcium}
                        visible={popupCameraCalciumVisible}
                        onClose={togglePopupCameraCalcium}
                        type="calcium"
                        openImagePicker={openImagePicker}
                        handleCameraLaunch={handleCameraLaunch}
                    />
                    <PopupCamera
                        selectedImage={selectedImageMagnesium}
                        visible={popupCameraMagnesiumVisible}
                        onClose={togglePopupCameraMagnesium}
                        type="magnesium"
                        openImagePicker={openImagePicker}
                        handleCameraLaunch={handleCameraLaunch}
                    />
                </>
            ) : (
                <>
                    <PopupCamera
                        viewImage
                        selectedImage={selectedImageChlorine}
                        visible={popupCameraChlorineVisible}
                        onClose={togglePopupCameraChlorine}
                        type="chlorine"
                    />
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

export default WaterAfterDetailScreen;
