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
                <View style={styles.titleContainer}>
                    <Text variant="titleMedium" style={styles.textTitle}>
                        Standard Color Chart
                    </Text>
                    <Text variant="titleSmall" style={styles.textDescription}>
                        เทียบสีมาตรฐาน
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageBox}>
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
        backgroundColor: theme.colors.primary
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
        marginBottom: 30
    },
    imageBox: {
        width: 350,
        height: 300
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
