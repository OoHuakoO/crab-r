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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AlkalineScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'Alkaline'
>;

const AlkalineScreen: FC<AlkalineScreenProps> = () => {
    const { top } = useSafeAreaInsets();
    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/alkalineIcon.png')}
                    textTitle="ข้อมูลค่าอัลคาไลนิตี้รวม"
                    textSubtitle="Total Alkalinity Data"
                />
                <View style={styles.titleContainer}>
                    <Text variant="titleLarge" style={styles.textTitle}>
                        วิธีวัดค่าอัลคาไลนิตี้
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageBox}>
                        <Image
                            source={require('../../assets/images/alkalineImg.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageBox2}>
                        <Image
                            source={require('../../assets/images/alkalineImg2.png')}
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
    imageContainer: {
        alignItems: 'center'
    },
    imageBox: {
        width: 380,
        height: 380
    },
    imageBox2: {
        width: 400,
        height: 250
    },
    image: {
        width: '100%',
        height: '100%'
    },
    boxTitleButton: {
        backgroundColor: theme.colors.secondary,
        marginLeft: 20,
        width: 150,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        padding: 2
    },
    textTitleButton: {
        color: theme.colors.primary,
        fontFamily: 'K2D-Bold',
        fontSize: 14
    },
    textContainer: {
        marginBottom: 30,
        marginHorizontal: 30
    },
    textDescription: {
        color: theme.colors.white,
        fontFamily: 'K2D-Regular',
        fontSize: 12
    }
});

export default AlkalineScreen;
