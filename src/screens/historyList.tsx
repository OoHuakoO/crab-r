/* eslint-disable react-native/no-inline-styles */
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import MenuList from '@src/components/core/menuList';
import { LIMIT } from '@src/constant';
import {
    GetCrabHatchInquiry,
    GetWaterQualityAfterInquiry,
    GetWaterQualityBeforeInquiry
} from '@src/services/saveData';
import { theme } from '@src/theme';
import { HistoryStackParamsList } from '@src/typings/navigation';
import { HistoryList } from '@src/typings/saveData';
import { parseDateString } from '@src/utils/time-manager';
import React, { FC, useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';

import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
    const [page, setPage] = useState<number>(1);
    const [stopFetchMore, setStopFetchMore] = useState<boolean>(true);

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
                return 'ประวัติบันทึกข้อมูลคุณภาพ\nน้ำหลังการพักน้ำได้ 7 วัน';
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
            let histories = [];
            let total = 0;
            if (route?.params?.namePage === 'before') {
                const res = await GetWaterQualityBeforeInquiry({
                    page: 1,
                    limit: LIMIT
                });
                if (res?.status === 200) {
                    histories = res.data;
                    histories.map((item) => {
                        item.path = 'WaterBeforeDetail';
                    });
                    total = res.total;
                } else {
                    setVisibleDialog(true);
                    setContentDialog('Something went wrong get data');
                    return;
                }
            }
            if (route?.params?.namePage === 'after') {
                const res = await GetWaterQualityAfterInquiry({
                    page: 1,
                    limit: LIMIT
                });
                if (res?.status === 200) {
                    histories = res.data;
                    histories.map((item) => {
                        item.path = 'WaterAfterDetail';
                    });
                    total = res.total;
                } else {
                    setVisibleDialog(true);
                    setContentDialog('Something went wrong get data');
                    return;
                }
            }
            if (route?.params?.namePage === 'crabHatch') {
                const res = await GetCrabHatchInquiry({
                    page: 1,
                    limit: LIMIT
                });
                if (res?.status === 200) {
                    histories = res.data;
                    histories.map((item) => {
                        item.path = 'CrabHatchDetail';
                    });
                    total = res.total;
                } else {
                    setVisibleDialog(true);
                    setContentDialog('Something went wrong get data');
                    return;
                }
            }
            setTotalHistory(total);
            setListHistory(histories);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog('Something went wrong get data');
        }
    }, [route?.params?.namePage]);

    const handleOnEndReached = async () => {
        try {
            setLoading(true);
            if (!stopFetchMore) {
                let histories = [];
                if (route?.params?.namePage === 'before') {
                    const res = await GetWaterQualityBeforeInquiry({
                        page: page + 1,
                        limit: LIMIT
                    });
                    if (res?.status === 200) {
                        histories = res.data;
                        histories.map((item) => {
                            item.path = 'WaterBeforeDetail';
                        });
                    } else {
                        setVisibleDialog(true);
                        setContentDialog('Something went wrong get data');
                        return;
                    }
                }
                if (route?.params?.namePage === 'after') {
                    const res = await GetWaterQualityAfterInquiry({
                        page: page + 1,
                        limit: LIMIT
                    });
                    if (res?.status === 200) {
                        histories = res.data;
                        histories.map((item) => {
                            item.path = 'WaterAfterDetail';
                        });
                    } else {
                        setVisibleDialog(true);
                        setContentDialog('Something went wrong get data');
                        return;
                    }
                }
                if (route?.params?.namePage === 'crabHatch') {
                    const res = await GetCrabHatchInquiry({
                        page: page + 1,
                        limit: LIMIT
                    });
                    if (res?.status === 200) {
                        histories = res.data;
                        histories.map((item) => {
                            item.path = 'CrabHatchDetail';
                        });
                    } else {
                        setVisibleDialog(true);
                        setContentDialog('Something went wrong get data');
                        return;
                    }
                }
                setPage(page + 1);
                setListHistory([...listHistory, ...histories]);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setStopFetchMore(true);
            setLoading(false);
            setVisibleDialog(true);
            setContentDialog('Something went wrong get data');
        }
    };

    useFocusEffect(
        useCallback(() => {
            handleGetHistory();
        }, [handleGetHistory])
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
                <View style={styles.listContainer}>
                    <Text variant="titleMedium" style={styles.textTotal}>
                        {`ทั้งหมด ${totalHistory}`}
                    </Text>
                    <FlatList
                        contentContainerStyle={{
                            alignItems: 'center',
                            paddingTop: 20
                        }}
                        style={{
                            width: '100%'
                        }}
                        data={listHistory}
                        renderItem={({ item }) => (
                            <MenuList
                                handlePress={() =>
                                    navigation.navigate(
                                        item?.path as keyof HistoryStackParamsList,
                                        {
                                            id: item?._id
                                        }
                                    )
                                }
                                textTitle={`${item?.location}`}
                                textSubtitle={`บ่อที่ ${
                                    item?.pool
                                } วันที่ ${parseDateString(item?.createdAt)}`}
                                textBoxMarginLeft={0.1}
                                textBoxAlignItems="flex-start"
                                textBoxGap={10}
                                columnButtonTextMarginLeft={0.1}
                                columnButtonSubTextMarginLeft={0.1}
                            />
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
        marginBottom: 180
    },
    textTotal: {
        color: theme.colors.white,
        fontFamily: 'K2D-Bold',
        marginLeft: 30,
        marginBottom: 10
    }
});

export default HistoryListScreen;
