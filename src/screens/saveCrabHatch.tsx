import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import InputText from '@src/components/core/inputeText';
import { GetCrabEggColors } from '@src/services/eggColor';
import { GetLocations } from '@src/services/location';
import { GetPools } from '@src/services/pool';
import { CreateCrabHatch } from '@src/services/saveData';
import { theme } from '@src/theme';
import { EggColorResponse } from '@src/typings/eggColor';
import { LocationResponse } from '@src/typings/location';
import {
    HomeStackParamsList,
    PrivateStackParamsList
} from '@src/typings/navigation';
import { PoolResponse } from '@src/typings/pool';
import { parseDateString } from '@src/utils/time-manager';
import React, { FC, useCallback, useEffect, useState } from 'react';
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

type SaveCrabHatchScreenProps = CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamsList, 'SaveCrabHatch'>,
    BottomTabScreenProps<PrivateStackParamsList>
>;

const SaveCrabHatchScreen: FC<SaveCrabHatchScreenProps> = (props) => {
    const { top } = useSafeAreaInsets();
    const { navigation } = props;
    const [listLocation, setListLocation] = useState<LocationResponse[]>([]);
    const [listPool, setListPool] = useState<PoolResponse[]>([]);
    const [listEggColor, setListEggColor] = useState<EggColorResponse[]>([]);
    const [selectLocation, setSelectLocation] = useState<string>('');
    const [selectPool, setSelectPool] = useState<string>('');
    const [selectEggColor, setSelectEggColor] = useState<string>('');
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [crabEggScoopDate, setCrabEggScoopDate] = useState(new Date());
    const [openCrabEggScoopDate, setOpenCrabEggScoopDate] = useState(false);

    const handleCloseDialog = useCallback(() => {
        setVisibleDialog(false);
    }, []);

    const handleDisableButton = useCallback((): boolean => {
        if (!selectLocation || !selectPool || !selectEggColor) {
            return true;
        }
        return false;
    }, [selectEggColor, selectLocation, selectPool]);

    const renderItemEggColor = (item: EggColorResponse) => {
        return (
            <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText} variant="bodyLarge">
                    {item?.color}
                </Text>
            </View>
        );
    };

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

    const handleInitDropdown = useCallback(async () => {
        try {
            const [responsePool, responseLocation, responseEggColor] =
                await Promise.all([
                    GetPools(),
                    GetLocations(),
                    GetCrabEggColors()
                ]);
            setListLocation(responseLocation?.data);
            setListPool(responsePool?.data);
            setListEggColor(responseEggColor?.data);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
        }
    }, []);

    const handleSaveData = async () => {
        try {
            const res = await CreateCrabHatch({
                location: selectLocation,
                pool: selectPool,
                crabEggColor: selectEggColor,
                crabEggScoopDate: crabEggScoopDate
            });
            if (res?.status === 200) {
                navigation.navigate('HistoryStack', {
                    screen: 'HistoryList',
                    params: { namePage: 'crabHatch' }
                });
            } else {
                setVisibleDialog(true);
                setContentDialog('Something went wrong save data');
                return;
            }
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog('Something went wrong save data');
        }
    };
    const handleOpenCrabEggScoopDate = useCallback(() => {
        setOpenCrabEggScoopDate(true);
        setCrabEggScoopDate(new Date());
    }, []);

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
                    image={require('../../assets/images/saveCrabHatchIcon.png')}
                    textTitle={`บันทึกข้อมูล\nการเพาะฟัก`}
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
                        สีไข่ปู
                    </Text>
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
                    <Text variant="bodyLarge" style={styles.textTitle}>
                        วันเขี่ยไข่ปู
                    </Text>

                    <InputText
                        calendarEggScoopDate
                        placeholder="Date"
                        value={
                            crabEggScoopDate
                                ? parseDateString(crabEggScoopDate.toString())
                                : null
                        }
                        handleOpenCrabEggScoopDate={handleOpenCrabEggScoopDate}
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
                        onPress={() => handleSaveData()}
                    >
                        <Text variant="bodyLarge" style={styles.buttonText}>
                            บันทึกข้อมูล
                        </Text>
                    </TouchableOpacity>
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
    textTitleCrabReleaseDate: {
        fontSize: 16,
        color: theme.colors.white,
        marginBottom: 10,
        marginTop: -5
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

export default SaveCrabHatchScreen;
