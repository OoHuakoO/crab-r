import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import MenuList from '@src/components/core/menuList';
import { theme } from '@src/theme';
import { HistoryStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

type HistorySaveDataProps = NativeStackScreenProps<
    HistoryStackParamsList,
    'HistorySaveData'
>;

const HistorySaveData: FC<HistorySaveDataProps> = (props) => {
    const { navigation } = props;
    const menu = [
        {
            textTitle: 'บันทึกข้อมูลคุณภาพน้ำ\nก่อนเข้าบ่อพักน้ำ',
            textSubtitle: '',
            image: require('../../assets/images/before.png'),
            path: 'SaveWaterBefore'
        },
        {
            textTitle: 'บันทึกข้อมูลคุณภาพน้ำ\nหลังการพักน้ำได้ 7 วัน',
            textSubtitle: '',
            image: require('../../assets/images/after.png'),
            path: 'SaveWaterAfter'
        },
        {
            textTitle: 'บันทึกข้อมูลการเพาะฟัก',
            textSubtitle: '',
            image: require('../../assets/images/hatching.png'),
            path: 'SaveCrabHatch',
            padding: 15
        }
    ];
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/saveData.png')}
                    textTitle="ประวัติบันทึกข้อมูล"
                    textSubtitle="History Save Data"
                />
                <View style={styles.menuListContainer}>
                    {menu?.map((item, index) => (
                        <MenuList
                            key={`menu-list-${index}`}
                            handlePress={() =>
                                navigation.navigate(
                                    item?.path as keyof HistoryStackParamsList
                                )
                            }
                            textTitle={item?.textTitle}
                            textSubtitle={item?.textSubtitle}
                            image={item?.image}
                            padding={item?.padding}
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
        marginTop: 80
    },
    menuListContainer: {
        alignItems: 'center',
        marginTop: 20
    }
});

export default HistorySaveData;