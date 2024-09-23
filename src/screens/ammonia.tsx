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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AmmoniaScreenProps = NativeStackScreenProps<HomeStackParamsList, 'Ph'>;

const AmmoniaScreen: FC<AmmoniaScreenProps> = () => {
    const { top } = useSafeAreaInsets();
    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/ammoniaIcon.png')}
                    textTitle="ข้อมูลค่าแอมโมเนีย"
                    textSubtitle="Ammonia Value Information"
                />

                <View style={styles.imageContainer}>
                    <View style={styles.imageBox1}>
                        <Image
                            source={require('../../assets/images/ammoniaTest.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageBox2}>
                        <Image
                            source={require('../../assets/images/ammoniaImg.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>

                <View style={styles.imageContainer}>
                    <View style={styles.imageGraphBox}>
                        <Image
                            source={require('../../assets/images/graphAmmonia.png')}
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
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    imageBox1: {
        width: 380,
        height: 380
    },
    imageBox2: {
        width: 380,
        height: 340
    },
    imageGraphBox: {
        width: 380,
        height: 220
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default AmmoniaScreen;
