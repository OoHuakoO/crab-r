/* eslint-disable react-native/no-inline-styles */
import CheckBox from '@react-native-community/checkbox';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import InputText from '@src/components/core/inputeText';
import MenuList from '@src/components/core/menuList';
import { ADMIN, LIMIT, SUPER_ADMIN } from '@src/constant';
import { GetLocations } from '@src/services/location';
import {
    GetAdminCrabHatchInquiry,
    GetAdminWaterQualityAfterInquiry,
    GetAdminWaterQualityBeforeInquiry,
    GetCrabHatchInquiry,
    GetWaterQualityAfterInquiry,
    GetWaterQualityBeforeInquiry
} from '@src/services/saveData';
import { loginState } from '@src/store';
import { theme } from '@src/theme';
import { LoginState } from '@src/typings/common';
import { LocationResponse } from '@src/typings/location';
import { HistoryStackParamsList } from '@src/typings/navigation';
import { HistoryList } from '@src/typings/saveData';
import { parseThaiDateString } from '@src/utils/time-manager';
import React, { FC, useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';

import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
type HistoryListScreenProps = NativeStackScreenProps<
    HistoryStackParamsList,
    'HistoryList'
>;

const HistoryListScreen: FC<HistoryListScreenProps> = (props) => {
    const { top } = useSafeAreaInsets();
    const { navigation, route } = props;
    const [listHistory, setListHistory] = useState<HistoryList[]>([]);
    const [totalHistory, setTotalHistory] = useState<number>(0);
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [stopFetchMore, setStopFetchMore] = useState<boolean>(true);
    const login = useRecoilValue<LoginState>(loginState);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [listLocation, setListLocation] = useState<LocationResponse[]>([]);
    const [selectLocation, setSelectLocation] = useState<string>('');

    const renderItemLocation = (item: LocationResponse) => {
        return (
            <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText} variant="bodyLarge">
                    {item?.name}
                </Text>
            </View>
        );
    };

    const getImage = useMemo((): string => {
        switch (route?.params?.namePage) {
            case 'before':
                return require('../../assets/images/saveWaterBeforeIcon.png');
            case 'after':
                return require('../../assets/images/saveWaterAfterIcon.png');
            case 'crabHatch':
                return require('../../assets/images/saveCrabHatchIcon.png');
            default:
                return require('../../assets/images/saveWaterBeforeIcon.png');
        }
    }, [route?.params?.namePage]);

    const getTextTitle = useMemo((): string => {
        switch (route?.params?.namePage) {
            case 'before':
                return 'ประวัติบันทึกข้อมูลคุณภาพ\nน้ำก่อนเข้าบ่อพักน้ำ';
            case 'after':
                return 'ประวัติบันทึกข้อมูลคุณภาพ\nน้ำหลังการพักน้ำได้ 3 วัน';
            case 'crabHatch':
                return 'ประวัติบันทึกข้อมูล\nการเพาะฟัก';
            default:
                return '';
        }
    }, [route?.params?.namePage]);

    const handleCloseDialog = useCallback(() => {
        setVisibleDialog(false);
    }, []);

    const handleGetHistory = useCallback(async () => {
        try {
            setLoading(true);
            setPage(1);

            const namePage = route?.params?.namePage;
            const isAdmin =
                login?.role === SUPER_ADMIN || login?.role === ADMIN;

            const apiMap = {
                before: {
                    admin: GetAdminWaterQualityBeforeInquiry,
                    user: GetWaterQualityBeforeInquiry,
                    path: 'WaterBeforeDetail'
                },
                after: {
                    admin: GetAdminWaterQualityAfterInquiry,
                    user: GetWaterQualityAfterInquiry,
                    path: 'WaterAfterDetail'
                },
                crabHatch: {
                    admin: GetAdminCrabHatchInquiry,
                    user: GetCrabHatchInquiry,
                    path: 'CrabHatchDetail'
                }
            };

            const apiConfig = apiMap[namePage];
            if (!apiConfig) {
                setVisibleDialog(true);
                setContentDialog('Unknown page type');
                return;
            }

            const apiFunc = isAdmin ? apiConfig.admin : apiConfig.user;
            const response = await apiFunc({ page: 1, limit: LIMIT });

            if (response?.status !== 200) {
                setVisibleDialog(true);
                setContentDialog('Something went wrong get data');
                return;
            }

            const histories = response.data.map((item) => ({
                ...item,
                path: apiConfig.path
            }));

            setTotalHistory(response.total);
            setListHistory(histories);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog('Something went wrong get data');
        }
    }, [login?.role, route?.params?.namePage]);

    const handleOnEndReached = useCallback(async () => {
        if (stopFetchMore) return;

        try {
            setLoading(true);
            const namePage = route?.params?.namePage;
            const isAdmin =
                login?.role === SUPER_ADMIN || login?.role === ADMIN;

            const apiMap = {
                before: {
                    admin: GetAdminWaterQualityBeforeInquiry,
                    user: GetWaterQualityBeforeInquiry,
                    path: 'WaterBeforeDetail'
                },
                after: {
                    admin: GetAdminWaterQualityAfterInquiry,
                    user: GetWaterQualityAfterInquiry,
                    path: 'WaterAfterDetail'
                },
                crabHatch: {
                    admin: GetAdminCrabHatchInquiry,
                    user: GetCrabHatchInquiry,
                    path: 'CrabHatchDetail'
                }
            };

            const apiConfig = apiMap[namePage];
            if (!apiConfig) {
                setVisibleDialog(true);
                setContentDialog('Unknown page type');
                return;
            }

            const apiFunc = isAdmin ? apiConfig.admin : apiConfig.user;
            const response = await apiFunc({ page: page + 1, limit: LIMIT });

            if (response?.status !== 200) {
                setVisibleDialog(true);
                setContentDialog('Something went wrong get data');
                return;
            }

            const newHistories = response.data.map((item) => ({
                ...item,
                path: apiConfig.path
            }));

            if (newHistories.length === 0) {
                setStopFetchMore(true);
            } else {
                setPage((prev) => prev + 1);
                setListHistory((prev) => [...prev, ...newHistories]);
            }
        } catch (err) {
            console.log(err);
            setStopFetchMore(true);
            setVisibleDialog(true);
            setContentDialog('Something went wrong get data');
        } finally {
            setLoading(false);
        }
    }, [stopFetchMore, login?.role, route?.params?.namePage, page]);

    const handleInitDropdown = useCallback(async () => {
        try {
            const responseLocation = await GetLocations();
            setListLocation(responseLocation?.data);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            handleGetHistory();
        }, [handleGetHistory])
    );

    useFocusEffect(
        useCallback(() => {
            handleInitDropdown();
        }, [handleInitDropdown])
    );

    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <Header />
            <AlertDialog
                textContent={contentDialog}
                visible={visibleDialog}
                handleClose={handleCloseDialog}
                handleConfirm={handleCloseDialog}
            />
            <View style={{ marginTop: 75, flex: 1 }}>
                <HeaderSection
                    image={getImage}
                    textTitle={getTextTitle}
                    fontSizeTextTitle={24}
                />
                <View
                    style={[
                        styles.listContainer,
                        { marginBottom: isEdit ? 180 : 320 }
                    ]}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        {isEdit ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <CheckBox
                                    style={{
                                        marginLeft: 20,
                                        marginRight: 10
                                    }}
                                    disabled={false}
                                    value={toggleCheckBox}
                                    onValueChange={(newValue) =>
                                        setToggleCheckBox(newValue)
                                    }
                                    tintColors={{
                                        true: theme.colors.secondary,
                                        false: theme.colors.secondary
                                    }}
                                />
                                <Text
                                    variant="titleMedium"
                                    style={styles.textEdit}
                                >
                                    เลือกทั้งหมด 5
                                </Text>
                            </View>
                        ) : (
                            <Text
                                variant="titleMedium"
                                style={styles.textTotal}
                            >
                                {`ข้อมูลทั้งหมด ${totalHistory}`}
                            </Text>
                        )}

                        <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
                            {isEdit ? (
                                <Text
                                    variant="titleMedium"
                                    style={styles.textEdit}
                                >
                                    ยกเลิก
                                </Text>
                            ) : (
                                <Text
                                    variant="titleMedium"
                                    style={styles.textEdit}
                                >
                                    แก้ไข
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {!isEdit && (
                        <View style={{ marginBottom: 20 }}>
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
                            <View
                                style={{
                                    marginHorizontal: 30,
                                    marginTop: 20,
                                    flexDirection: 'row',
                                    width: '60%',
                                    alignItems: 'center'
                                }}
                            >
                                <InputText
                                    marginBottomContainer={1}
                                    height={45}
                                    calendarEggScoopDate
                                    placeholder="Date"
                                    value={parseThaiDateString(
                                        new Date().toString()
                                    )}
                                    readOnly
                                />
                                <DatePicker
                                    modal
                                    mode="date"
                                    open={false}
                                    date={new Date()}
                                />
                                <TouchableOpacity
                                    style={styles.buttonClear}
                                    onPress={() => setIsEdit(!isEdit)}
                                >
                                    <Text
                                        variant="titleMedium"
                                        style={styles.textClear}
                                    >
                                        เคลียร์
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <FlatList
                        contentContainerStyle={{
                            marginTop: 10,
                            alignItems: 'center'
                        }}
                        data={listHistory}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%'
                                }}
                            >
                                {isEdit && (
                                    <CheckBox
                                        style={{
                                            marginRight: 10,
                                            marginTop: 15
                                        }}
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) =>
                                            setToggleCheckBox(newValue)
                                        }
                                        tintColors={{
                                            true: theme.colors.secondary,
                                            false: theme.colors.secondary
                                        }}
                                    />
                                )}

                                <MenuList
                                    handlePress={() => {
                                        if (!isEdit) {
                                            navigation.navigate(
                                                item?.path as keyof HistoryStackParamsList,
                                                {
                                                    id: item?._id
                                                }
                                            );
                                        }
                                    }}
                                    textTitle={`${item?.location}`}
                                    textSubtitle={
                                        item?.pool
                                            ? `บ่อที่ ${
                                                  item?.pool
                                              } วันที่ ${parseThaiDateString(
                                                  item?.createdAt
                                              )}`
                                            : `วันที่ ${parseThaiDateString(
                                                  item?.createdAt
                                              )}`
                                    }
                                    textBoxMarginLeft={0.1}
                                    textBoxAlignItems="flex-start"
                                    textBoxGap={10}
                                    columnButtonTextMarginLeft={0.1}
                                    columnButtonSubTextMarginLeft={0.1}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item._id.toString()}
                        onEndReached={handleOnEndReached}
                        onEndReachedThreshold={0.5}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={() => console.log('refreshing')}
                                tintColor={theme.colors.white}
                                titleColor={theme.colors.white}
                            />
                        }
                        onScrollBeginDrag={() => setStopFetchMore(false)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        marginTop: StatusBar.currentHeight
    },
    listContainer: {
        width: '100%'
    },
    textTotal: {
        color: theme.colors.white,
        fontFamily: 'K2D-Bold',
        marginLeft: 30,
        marginBottom: 10
    },
    textEdit: {
        marginRight: 30,
        color: theme.colors.white,
        fontFamily: 'K2D-Bold'
    },
    textClear: {
        color: theme.colors.white,
        fontFamily: 'K2D-Bold'
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
        height: 40,
        borderColor: theme.colors.borderAutocomplete,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: theme.colors.blackGray,
        marginHorizontal: 30,
        marginTop: 10
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
    buttonClear: {
        paddingVertical: 9,
        paddingHorizontal: 24,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.gold,
        marginLeft: 15
    }
});

export default HistoryListScreen;
