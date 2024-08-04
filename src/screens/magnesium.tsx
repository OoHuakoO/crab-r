/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import { theme } from '@src/theme';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { Text } from 'react-native-paper';

type MagnesiumScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'Magnesium'
>;

const MagnesiumScreen: FC<MagnesiumScreenProps> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/magnesiumIcon.png')}
                    textTitle="ข้อมูลค่าแมกนีเซียมและแคลเซียม"
                    textSubtitle="Magnesium And Calcium Information"
                />
                <View style={styles.titleContainer}>
                    <Text variant="titleLarge" style={styles.textTitle}>
                        วิธีวัดค่าแมกนีเซียมและแคลเซียม
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageBox}>
                        <Image
                            source={require('../../assets/images/magnesiumImg1.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.boxTitleButton}>
                    <Text style={styles.textTitleButton}>การทดสอบ A</Text>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageBox}>
                        <Image
                            source={require('../../assets/images/magnesiumImg2.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.boxTitleButton}>
                    <Text style={styles.textTitleButton}>การทดสอบ B</Text>
                </View>
                <View style={[styles.imageContainer, { marginBottom: 30 }]}>
                    <View style={styles.imageBox}>
                        <Image
                            source={require('../../assets/images/magnesiumImg3.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.backgroundImg
    },
    scrollView: {
        flex: 1,
        marginTop: 75
    },
    titleContainer: { marginBottom: 10, marginLeft: 30 },
    textTitle: {
        color: theme.colors.white,
        fontFamily: 'K2D-Bold'
    },
    textDescription: {
        color: theme.colors.white,
        fontFamily: 'K2D-Medium'
    },
    textSubDescriptionWrap: {
        color: theme.colors.white,
        fontFamily: 'K2D-Regular'
    },
    textSubDescription: {
        color: theme.colors.white,
        fontFamily: 'K2D-Regular'
    },
    imageContainer: {
        alignItems: 'center'
    },
    imageBox: {
        width: 380,
        height: 170
    },
    image: {
        width: '100%',
        height: '100%'
    },
    boxTitleButton: {
        backgroundColor: theme.colors.textYellow,
        marginLeft: 20,
        width: 150,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10
    },
    textTitleButton: {
        color: theme.colors.primary,
        fontFamily: 'K2D-Bold',
        fontSize: 14
    }
});

export default MagnesiumScreen;
