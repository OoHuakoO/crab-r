/* eslint-disable @typescript-eslint/no-shadow */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import { GetLocations } from '@src/services/location';
import { GetPools } from '@src/services/pool';
import { CreateCrabHatch } from '@src/services/saveData';
import { theme } from '@src/theme';
import { LocationResponse } from '@src/typings/location';
import { HomeStackParamsList } from '@src/typings/navigation';
import { PoolResponse } from '@src/typings/pool';
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import InputText from '@src/components/core/inputeText';
import { GetCrabEggColors } from '@src/services/eggColor';
import { EggColorResponse } from '@src/typings/eggColor';
import { parseDateString } from '@src/utils/time-manager';
import DatePicker from 'react-native-date-picker';
import { Text } from 'react-native-paper';

type SaveCrabHatchScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'SaveCrabHatch'
>;

const SaveCrabHatchScreen: FC<SaveCrabHatchScreenProps> = () => {
    const [listLocation, setListLocation] = useState<LocationResponse[]>([]);
    const [listPool, setListPool] = useState<PoolResponse[]>([]);
    const [listEggColor, setListEggColor] = useState<EggColorResponse[]>([]);
    const [selectLocation, setSelectLocation] = useState<string>('');
    const [selectPool, setSelectPool] = useState<string>('');
    const [selectEggColor, setSelectEggColor] = useState<string>('');
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [date, setDate] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);

    const handleCloseDialog = useCallback(() => {
        setVisibleDialog(false);
    }, []);

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
            setListLocation(responsePool?.data);
            setListPool(responseLocation?.data);
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
                releaseDate: parseDateString(date.toString())
            });
            if (res?.status === 200) {
                console.log('success');
            }
        } catch (err) {
            console.log(err);
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
                    <TouchableOpacity
                        onPress={() => {
                            setOpenDate(true);
                            setDate(new Date());
                        }}
                    >
                        <InputText
                            placeholder="Date"
                            value={
                                date ? parseDateString(date.toString()) : null
                            }
                            readOnly
                        />
                    </TouchableOpacity>

                    <DatePicker
                        modal
                        mode="date"
                        open={openDate}
                        date={date}
                        onConfirm={(date) => {
                            setOpenDate(false);
                            setDate(date);
                        }}
                        onCancel={() => {
                            setOpenDate(false);
                        }}
                    />

                    <TouchableOpacity
                        style={styles.buttonApply}
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
        fontFamily: 'DMSans-Regular',
        fontSize: 16,
        color: theme.colors.textBody
    },
    selectedTextStyle: {
        fontSize: 16,
        color: theme.colors.blackGray,
        fontFamily: 'DMSans-Regular'
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: theme.colors.blackGray,
        fontFamily: 'DMSans-Regular'
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
        fontFamily: 'DMSans-Regular'
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

export default SaveCrabHatchScreen;
