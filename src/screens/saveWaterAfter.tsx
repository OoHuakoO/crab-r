import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import InputText from '@src/components/core/inputeText';
import PopupCamera from '@src/components/core/popupCamera';
import { GetLocations } from '@src/services/location';
import { GetPools } from '@src/services/pool';
import { CreateWaterQualityAfter } from '@src/services/saveData';
import { theme } from '@src/theme';
import { LocationResponse } from '@src/typings/location';
import { HomeStackParamsList } from '@src/typings/navigation';
import { PoolResponse } from '@src/typings/pool';
import { SaveWaterAfter } from '@src/typings/saveData';
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

import FormData from 'form-data';
import {
    MediaType,
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { Text } from 'react-native-paper';

type SaveWaterAfterScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'SaveWaterAfter'
>;

const SaveWaterAfterScreen: FC<SaveWaterAfterScreenProps> = () => {
    const [listLocation, setListLocation] = useState<LocationResponse[]>([]);
    const [listPool, setListPool] = useState<PoolResponse[]>([]);
    const [selectLocation, setSelectLocation] = useState<string>('');
    const [selectPool, setSelectPool] = useState<string>('');
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

    const renderItemPool = (item: LocationResponse) => {
        return (
            <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText} variant="bodyLarge">
                    {item?.name}
                </Text>
            </View>
        );
    };

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
            const [responsePool, responseLocation] = await Promise.all([
                GetPools(),
                GetLocations()
            ]);
            setListLocation(responseLocation?.data);
            setListPool(responsePool?.data);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
        }
    }, []);

    const handleSaveData = async (data: SaveWaterAfter) => {
        try {
            var formData = new FormData();
            formData.append('location', selectLocation);
            formData.append('pool', selectPool);
            formData.append('ammonia', data?.ammonia || '');
            formData.append('calcium', data?.calcium || '');
            formData.append('magnesium', data?.magnesium || '');
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
                console.log('success');
            }
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog('Something went wrong save data');
        }
    };

    useEffect(() => {
        handleInitDropdown();
    }, [handleInitDropdown]);

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
                        บ่อที่
                    </Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={listPool}
                        maxHeight={300}
                        labelField="name"
                        valueField="name"
                        placeholder={'เลือกบ่อ'}
                        value={selectPool}
                        onChange={(item) => {
                            setSelectPool(item?.name);
                        }}
                        renderItem={renderItemPool}
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
                        style={styles.buttonApply}
                        onPress={form?.handleSubmit(handleSaveData)}
                    >
                        <Text variant="bodyLarge" style={styles.buttonText}>
                            บันทึกข้อมูล
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
        marginHorizontal: 50,
        backgroundColor: theme.colors.gold
    },
    buttonText: {
        color: theme.colors.white
    }
});

export default SaveWaterAfterScreen;
