import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import { theme } from '@src/theme';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

type SaveWaterBeforeScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'SaveWaterBefore'
>;

const SaveWaterBeforeScreen: FC<SaveWaterBeforeScreenProps> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/saveWaterBeforeIcon.png')}
                    textTitle={`บันทึกข้อมูลคุณภาพน้ำ\nก่อนเข้าบ่อพัก`}
                    fontSizeTextTitle={24}
                />
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
    }
});

export default SaveWaterBeforeScreen;