import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import InputText from '@src/components/core/inputeText';
import PopupSaveData from '@src/components/core/popupSaveData';
import { CANCELCONTENTDIALOG } from '@src/constant';
import { GetCrabEggColors } from '@src/services/eggColor';
import { GetLocations } from '@src/services/location';
import { GetCrabHatchById, UpdateCrabHatch } from '@src/services/saveData';
import { theme } from '@src/theme';
import { EggColorResponse } from '@src/typings/eggColor';
import { LocationResponse } from '@src/typings/location';
import { HistoryStackParamsList } from '@src/typings/navigation';
import { ListPopupData, SaveCrabHatch } from '@src/typings/saveData';
import {
    getCrabReleaseDate,
    parseThaiDateString
} from '@src/utils/time-manager';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';

import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CrabHatchDetailScreenProps = BottomTabScreenProps<
    HistoryStackParamsList,
    'WaterAfterDetail'
>;

const CrabHatchDetailScreen: FC<CrabHatchDetailScreenProps> = (props) => {
    const { route, navigation } = props;
    const { top } = useSafeAreaInsets();
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [textConfirm, setTextConfirm] = useState<string>('');
    const [textCancel, setTextCancel] = useState<string>('');
    const [showCloseDialog, setShowCloseDialog] = useState<boolean>(false);
    const [isCancelDialog, setIsCancelDialog] = useState<boolean>(false);
    const [listLocation, setListLocation] = useState<LocationResponse[]>([]);
    const [listPool, setListPool] = useState<{ name: string }[]>([]);
    const [listEggColor, setListEggColor] = useState<EggColorResponse[]>([]);
    const [selectLocation, setSelectLocation] = useState<string>('');
    const [selectPool, setSelectPool] = useState<string>('');
    const [selectEggColor, setSelectEggColor] = useState<string>('');
    const [popupSaveDataVisible, setPopupSaveDataVisible] = useState(false);
    const [crabEggScoopDate, setCrabEggScoopDate] = useState(new Date());
    const [crabReleaseDate, setCrabReleaseDate] = useState(new Date());
    const [openCrabEggScoopDate, setOpenCrabEggScoopDate] = useState(false);
    const [listPopupData, setListPopupData] = useState<ListPopupData[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const form = useForm<SaveCrabHatch>({});

    const clearStateDialog = useCallback(() => {
        setVisibleDialog(false);
        setTextConfirm('');
        setTextCancel('');
        setContentDialog('');
        setShowCloseDialog(false);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setVisibleDialog(false);
    }, []);

    const handleCloseDialogCancel = useCallback(() => {
        clearStateDialog();
    }, [clearStateDialog]);

    const onClosePopupSaveData = () => {
        setPopupSaveDataVisible(!popupSaveDataVisible);
    };

    const handleDisableButton = useCallback((): boolean => {
        if (
            !selectLocation ||
            !selectPool ||
            !selectEggColor ||
            !form.watch('countCrab')
        ) {
            return true;
        }
        return false;
    }, [form, selectEggColor, selectLocation, selectPool]);

    const renderItemEggColor = (item: EggColorResponse) => {
        return (
            <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText} variant="bodyLarge">
                    {item?.color}
                </Text>
            </View>
        );
    };

    const renderItemPool = (item: { name: string }) => {
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

    const togglePopupSaveData = () => {
        const listData: ListPopupData[] = [];
        setPopupSaveDataVisible(!popupSaveDataVisible);

        const crabReleaseDateStringValue = getCrabReleaseDate(
            selectEggColor,
            crabEggScoopDate
        );

        if (selectEggColor === 'ดำ (1 วัน)') {
            listData.push({
                primary: 'กำหนดปล่อย',
                secondary: `วันที่ ${crabReleaseDateStringValue}`
            });
        } else if (selectEggColor === 'เทา (2 วัน)') {
            listData.push({
                primary: 'กำหนดปล่อย',
                secondary: `วันที่ ${crabReleaseDateStringValue}`
            });
        } else if (selectEggColor === 'น้ำตาล (3 วัน)') {
            listData.push({
                primary: 'กำหนดปล่อย',
                secondary: `วันที่ ${crabReleaseDateStringValue}`
            });
        } else if (selectEggColor === 'เหลือง-ส้ม (5 วัน)') {
            listData.push({
                primary: 'กำหนดปล่อย',
                secondary: `วันที่ ${crabReleaseDateStringValue}`
            });
        } else {
            listData.push({
                primary: 'กำหนดปล่อย',
                secondary: `วันที่ ${crabReleaseDateStringValue}`
            });
        }

        const crabReleaseDateToDateValue = getCrabReleaseDate(
            selectEggColor,
            crabEggScoopDate,
            true
        );

        setCrabReleaseDate(crabReleaseDateToDateValue as Date);
        setListPopupData(listData);
    };

    const handlePopupOnSave = async () => {
        try {
            const res = await UpdateCrabHatch({
                id: route?.params?.id,
                location: selectLocation,
                pool: selectPool,
                countCrab: parseFloat(form?.getValues('countCrab')),
                crabEggColor: selectEggColor,
                crabEggScoopDate: crabEggScoopDate,
                crabReleaseDate: crabReleaseDate
            });
            if (res?.status === 200) {
                navigation.goBack();
            } else {
                setVisibleDialog(true);
                setContentDialog('Something went wrong save data');
                return;
            }
            setPopupSaveDataVisible(false);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog('Something went wrong save data');
        }
    };

    const handleOpenCrabEggScoopDate = useCallback(() => {
        setOpenCrabEggScoopDate(true);
    }, []);

    const handleGetCrabHatch = useCallback(async () => {
        try {
            clearStateDialog();
            const res = await GetCrabHatchById(route?.params?.id);
            if (res?.status === 200) {
                const pool = listLocation.find(
                    (location) => location.name === res?.data?.location
                );
                const poolArray = Array.from(
                    { length: Number(pool?.maxPool || 1) },
                    (_, i) => ({
                        name: (i + 1).toString()
                    })
                );
                setListPool(poolArray);
                setSelectLocation(res?.data?.location);
                setSelectPool(res?.data?.pool);
                setSelectEggColor(res?.data?.crabEggColor);
                setCrabEggScoopDate(new Date(res?.data?.crabEggScoopDate));
                form.setValue('location', res?.data?.location || '');
                form.setValue('pool', res?.data?.pool || '');
                form.setValue('crabEggColor', res?.data?.crabEggColor || '');
                form.setValue(
                    'countCrab',
                    res?.data?.countCrab.toString() || ''
                );
                form.setValue(
                    'crabEggScoopDate',
                    parseThaiDateString(
                        res?.data?.crabEggScoopDate?.toString()
                    ) || ''
                );
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
    }, [clearStateDialog, form, listLocation, route?.params?.id]);

    const handleInitDropdown = useCallback(async () => {
        try {
            const [responseLocation, responseEggColor] = await Promise.all([
                GetLocations(),
                GetCrabEggColors()
            ]);
            setListLocation(responseLocation?.data);
            setListEggColor(responseEggColor?.data);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
        }
    }, []);

    const handleConfirmDialogCancel = useCallback(() => {
        handleGetCrabHatch();
    }, [handleGetCrabHatch]);

    useEffect(() => {
        handleGetCrabHatch();
    }, [handleGetCrabHatch]);

    useEffect(() => {
        handleInitDropdown();
    }, [handleInitDropdown]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            e.preventDefault();
            navigation.navigate('HistorySaveData');
        });

        return unsubscribe;
    }, [navigation]);

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
                    image={require('../../assets/images/saveCrabHatchIcon.png')}
                    textTitle={`ประวัติบันทึกข้อมูล\nการเพาะฟัก`}
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
                                const maxPool = Number(item?.maxPool);
                                const poolArray = Array.from(
                                    { length: maxPool },
                                    (_, i) => ({
                                        name: (i + 1).toString()
                                    })
                                );
                                setListPool(poolArray);
                                setSelectPool('');
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
                        บ่อที่
                    </Text>
                    {isEdit ? (
                        <Dropdown
                            style={[
                                styles.dropdown,
                                selectLocation === '' && {
                                    backgroundColor: theme.colors.disableInput
                                }
                            ]}
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
                            disable={selectLocation === ''}
                            renderItem={renderItemPool}
                        />
                    ) : (
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
                                    onChangeText={(value) =>
                                        field?.onChange(value)
                                    }
                                    readOnly
                                />
                            )}
                        />
                    )}

                    <Text variant="bodyLarge" style={styles.textTitle}>
                        สีไข่ปู
                    </Text>
                    {isEdit ? (
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={listEggColor}
                            maxHeight={300}
                            labelField="color"
                            valueField="color"
                            placeholder={'เลือกสีไข่ปู'}
                            value={selectEggColor}
                            onChange={(item) => {
                                setSelectEggColor(item?.color);
                            }}
                            renderItem={renderItemEggColor}
                        />
                    ) : (
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
                                    onChangeText={(value) =>
                                        field?.onChange(value)
                                    }
                                    readOnly
                                />
                            )}
                        />
                    )}

                    <Text variant="bodyLarge" style={styles.textTitle}>
                        จำนวนปู
                    </Text>

                    <Controller
                        name="countCrab"
                        defaultValue=""
                        control={form?.control}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                marginBottomContainer={1}
                                placeholder="ระบุจำนวนปู"
                                returnKeyType="next"
                                autoCapitalize="none"
                                textContentType="none"
                                onChangeText={(value) => field?.onChange(value)}
                                readOnly={isEdit ? false : true}
                            />
                        )}
                    />
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        วันเขี่ยไข่ปู
                    </Text>
                    {isEdit ? (
                        <>
                            <InputText
                                calendarEggScoopDate
                                placeholder="Date"
                                value={
                                    crabEggScoopDate
                                        ? parseThaiDateString(
                                              crabEggScoopDate.toString()
                                          )
                                        : null
                                }
                                handleOpenCrabEggScoopDate={
                                    handleOpenCrabEggScoopDate
                                }
                                readOnly
                            />
                            <DatePicker
                                modal
                                mode="date"
                                open={openCrabEggScoopDate}
                                date={crabEggScoopDate}
                                onConfirm={(date) => {
                                    setOpenCrabEggScoopDate(false);
                                    setCrabEggScoopDate(date);
                                }}
                                onCancel={() => {
                                    setOpenCrabEggScoopDate(false);
                                }}
                            />
                        </>
                    ) : (
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
                                    onChangeText={(value) =>
                                        field?.onChange(value)
                                    }
                                    readOnly
                                />
                            )}
                        />
                    )}
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
                onSave={handlePopupOnSave}
                listData={listPopupData}
                visible={popupSaveDataVisible}
                onClose={onClosePopupSaveData}
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
    dropdown: {
        height: 50,
        borderColor: theme.colors.borderAutocomplete,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: theme.colors.blackGray
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
    buttonApply: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
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
    rowButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    rowEditButton: {
        marginTop: 30
    }
});

export default CrabHatchDetailScreen;
