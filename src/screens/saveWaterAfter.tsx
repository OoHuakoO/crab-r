import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import InputText from '@src/components/core/inputeText';
import PopupCamera from '@src/components/core/popupCamera';
import { GetLocations } from '@src/services/location';
import { CreateWaterQualityAfter } from '@src/services/saveData';
import { theme } from '@src/theme';
import { LocationResponse } from '@src/typings/location';
import {
    HomeStackParamsList,
    PrivateStackParamsList
} from '@src/typings/navigation';
import { ListPopupData, SaveWaterAfter } from '@src/typings/saveData';
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

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import PopupSaveData from '@src/components/core/popupSaveData';
import FormData from 'form-data';
import {
    MediaType,
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SaveWaterAfterScreenProps = CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamsList, 'SaveWaterAfter'>,
    BottomTabScreenProps<PrivateStackParamsList>
>;

const SaveWaterAfterScreen: FC<SaveWaterAfterScreenProps> = (props) => {
    const { top } = useSafeAreaInsets();
    const { navigation } = props;
    const [listLocation, setListLocation] = useState<LocationResponse[]>([]);
    const [selectLocation, setSelectLocation] = useState<string>('');
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [listPopupData, setListPopupData] = useState<ListPopupData[]>([]);

    const [popupSaveDataVisible, setPopupSaveDataVisible] = useState(false);
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

    const handleInitDropdown = useCallback(async () => {
        try {
            const [responseLocation] = await Promise.all([GetLocations()]);
            setListLocation(responseLocation?.data);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
        }
    }, []);

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

            const res = await CreateWaterQualityAfter(formData);
            if (res?.status === 200) {
                navigation.navigate('HistoryStack', {
                    screen: 'HistoryList',
                    params: { namePage: 'after' }
                });
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

    useEffect(() => {
        handleInitDropdown();
    }, [handleInitDropdown]);

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
                    image={require('../../assets/images/saveWaterAfterIcon.png')}
                    textTitle={`บันทึกข้อมูลคุณภาพน้ำ\nหลังการพักน้ำได้ 7 วัน`}
                    fontSizeTextTitle={24}
                />
                <View style={styles.containerInput}>
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        สถานที่
                    </Text>
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
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        ค่าคลอรีน
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
                                placeholder="ระบุค่าคลอรีน"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                camera
                                onChangeText={(value) => field?.onChange(value)}
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
                                camera
                                onChangeText={(value) => field?.onChange(value)}
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
                                camera
                                onChangeText={(value) => field?.onChange(value)}
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
                                camera
                                onChangeText={(value) => field?.onChange(value)}
                            />
                        )}
                    />
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
                        <Text variant="bodyLarge" style={styles.buttonText}>
                            บันทึกข้อมูล
                        </Text>
                    </TouchableOpacity>
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
        marginHorizontal: 25
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
    textTitle: {
        fontSize: 16,
        color: theme.colors.white,
        marginVertical: 10
    },
    buttonApply: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
        marginHorizontal: 50
    },
    buttonText: {
        color: theme.colors.white
    }
});

export default SaveWaterAfterScreen;
