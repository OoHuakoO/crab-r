import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import InputText from '@src/components/core/inputeText';
import PopupCamera from '@src/components/core/popupCamera';
import { GetLocations } from '@src/services/location';
import { GetPools } from '@src/services/pool';
import { CreateWaterQualityBefore } from '@src/services/saveData';
import { theme } from '@src/theme';
import { LocationResponse } from '@src/typings/location';
import {
    HomeStackParamsList,
    PrivateStackParamsList
} from '@src/typings/navigation';
import { PoolResponse } from '@src/typings/pool';
import { SaveWaterBefore } from '@src/typings/saveData';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    ActivityIndicator,
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
import FormData from 'form-data';
import {
    MediaType,
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { Text } from 'react-native-paper';

type SaveWaterBeforeScreenProps = CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamsList, 'SaveWaterBefore'>,
    BottomTabScreenProps<PrivateStackParamsList>
>;

const SaveWaterBeforeScreen: FC<SaveWaterBeforeScreenProps> = (props) => {
    const { navigation } = props;
    const [listLocation, setListLocation] = useState<LocationResponse[]>([]);
    const [listPool, setListPool] = useState<PoolResponse[]>([]);
    const [selectLocation, setSelectLocation] = useState<string>('');
    const [selectPool, setSelectPool] = useState<string>('');
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

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

    const handleDisableButton = useCallback((): boolean => {
        if (
            !selectLocation ||
            !selectPool ||
            !form.watch('alkaline') ||
            !form.watch('ph') ||
            !form.watch('salinity')
        ) {
            return true;
        }
        return false;
    }, [form, selectLocation, selectPool]);

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

    const handleSaveData = async (data: SaveWaterBefore) => {
        try {
            setLoading(true);
            var formData = new FormData();
            formData.append('location', selectLocation);
            formData.append('pool', selectPool);
            formData.append('salinity', data?.salinity || '');
            formData.append('ph', data?.ph || '');
            formData.append('alkaline', data?.alkaline || '');
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

            const res = await CreateWaterQualityBefore(formData);
            if (res?.status === 200) {
                navigation.navigate('HistoryStack', {
                    screen: 'HistoryList',
                    params: { namePage: 'before' }
                });
            } else {
                setLoading(false);
                setVisibleDialog(true);
                setContentDialog('Something went wrong save data');
                return;
            }
            setLoading(false);
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
                    textTitle={`บันทึกข้อมูลคุณภาพน้ำ\nก่อนเข้าบ่อพัก`}
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
                                camera
                                onChangeText={(value) => field?.onChange(value)}
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
                                camera
                                onChangeText={(value) => field?.onChange(value)}
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
                        onPress={form?.handleSubmit(handleSaveData)}
                    >
                        {loading ? (
                            <ActivityIndicator
                                size="small"
                                color={theme.colors.white}
                            />
                        ) : (
                            <Text variant="bodyLarge" style={styles.buttonText}>
                                บันทึกข้อมูล
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

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

export default SaveWaterBeforeScreen;
