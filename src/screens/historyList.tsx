import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import MenuList from '@src/components/core/menuList';
import {
    GetCrabHatchInquiry,
    GetWaterQualityAfterInquiry,
    GetWaterQualityBeforeInquiry
} from '@src/services/saveData';
import { theme } from '@src/theme';
import { HistoryStackParamsList } from '@src/typings/navigation';
import { HistoryList } from '@src/typings/saveData';
import { parseDateStringTime } from '@src/utils/time-manager';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

type HistoryListScreenProps = NativeStackScreenProps<
    HistoryStackParamsList,
    'HistoryList'
>;

const HistoryListScreen: FC<HistoryListScreenProps> = (props) => {
    const { navigation, route } = props;
    const [listHistory, setListHistory] = useState<HistoryList[]>([]);
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');

    const handleCloseDialog = useCallback(() => {
        setVisibleDialog(false);
    }, []);

    const handleGetHistory = useCallback(async () => {
        try {
            let histories = [];
            if (route?.params?.namePage === 'before') {
                const res = await GetWaterQualityBeforeInquiry();
                if (res?.status === 200) {
                    histories = [...res.data];
                    histories.map((item) => {
                        item.image = require('../../assets/images/before.png');
                        item.path = 'WaterBeforeDetail';
                    });
                    setListHistory(histories);
                } else {
                    setVisibleDialog(true);
                    setContentDialog('Something went wrong get data');
                }
            }
            if (route?.params?.namePage === 'after') {
                const res = await GetWaterQualityAfterInquiry();
                if (res?.status === 200) {
                    histories = [...res.data];
                    histories.map((item) => {
                        item.image = require('../../assets/images/after.png');
                        item.path = 'WaterAfterDetail';
                    });
                    setListHistory(histories);
                } else {
                    setVisibleDialog(true);
                    setContentDialog('Something went wrong get data');
                }
            }
            if (route?.params?.namePage === 'crabHatch') {
                const res = await GetCrabHatchInquiry();
                if (res?.status === 200) {
                    histories = [...res.data];
                    histories.map((item) => {
                        item.image = require('../../assets/images/hatching.png');
                        item.path = 'CrabHatchDetail';
                    });
                    setListHistory(histories);
                } else {
                    setVisibleDialog(true);
                    setContentDialog('Something went wrong get data');
                }
            }
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog('Something went wrong get data');
        }
    }, [route?.params?.namePage]);

    useEffect(() => {
        handleGetHistory();
    }, [handleGetHistory]);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <AlertDialog
                textContent={contentDialog}
                visible={visibleDialog}
                handleClose={handleCloseDialog}
                handleConfirm={handleCloseDialog}
            />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/bookKnowledge.png')}
                    textTitle={`บันทึกข้อมูลคุณภาพน้ำ\nก่อนเข้าบ่อพัก`}
                    fontSizeTextTitle={24}
                />
                <View style={styles.menuListContainer}>
                    {listHistory?.map((item, index) => (
                        <MenuList
                            key={`menu-list-${index}`}
                            handlePress={() =>
                                navigation.navigate(
                                    item?.path as keyof HistoryStackParamsList,
                                    {
                                        id: item?._id
                                    }
                                )
                            }
                            textTitle={`ครั้งที่ ${index + 1}`}
                            textSubtitle={`วัน เวลา ${parseDateStringTime(
                                item?.createdAt
                            )}`}
                            image={item?.image}
                        />
                    ))}
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
        marginTop: 75
    },
    menuListContainer: {
        alignItems: 'center',
        marginTop: 20
    }
});

export default HistoryListScreen;
