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

type CrabCircleScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'CrabCircle'
>;

const CrabCircleScreen: FC<CrabCircleScreenProps> = () => {
    const { top } = useSafeAreaInsets();
    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/crabCircuitWhite.png')}
                    textTitle="ข้อมูลวงจรลูกปู"
                    textSubtitle="Crab Life Cycle"
                />
                <View style={styles.imageContainer}>
                    <View style={styles.imageBox}>
                        <Image
                            source={require('../../assets/images/crabCircuitImg.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.imageContainer}>
                    <View style={styles.imageBox}>
                        <Image
                            source={require('../../assets/images/crabCircuitImg2.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>

                {/* <View style={styles.textContainer}>
                    <Text variant="titleLarge" style={styles.textTitle}>
                        อายุได้ไข่
                    </Text>
                    <Text variant="titleMedium" style={styles.textDescription}>
                        ปูตัวเต็มวัยสามารถวางไข่ได้ในช่วง 3-5 เดือน
                    </Text>
                    <Text variant="titleLarge" style={styles.textTitle}>
                        ระยะซูเอีย
                    </Text>
                    <Text variant="titleMedium" style={styles.textDescription}>
                        ลูกปูจะพัฒนาตัวเองจากไข่เป็นลูกปูที่สมบูรณ์ในระยะเวลาประมาณ
                        1-4 วัน
                    </Text>
                    <Text variant="titleLarge" style={styles.textTitle}>
                        ระยะเมกาโลปา
                    </Text>
                    <Text variant="titleMedium" style={styles.textDescription}>
                        ลูกปูมีการพัฒนาไปสู่อีกขั้นหนึ่งในช่วง 10-15 วัน
                    </Text>
                    <Text variant="titleLarge" style={styles.textTitle}>
                        ลูกปูวัยอ่อน
                    </Text>
                    <Text variant="titleMedium" style={styles.textDescription}>
                        ลูกปูเติบโตเต็มที่และพร้อมจะปล่อยสู่ทะเลในระยะเวลา 15-30
                        วัน
                    </Text>
                </View> */}
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
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    imageBox: {
        width: 400,
        height: 300
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textContainer: {
        marginLeft: 20,
        marginTop: 20,
        gap: 10,
        marginBottom: 30
    },
    textTitle: {
        color: theme.colors.textYellow,
        fontSize: 20
    },
    textDescription: {
        color: theme.colors.white,
        fontSize: 16,
        marginLeft: 20
    },
    divider: {
        height: 3,
        backgroundColor: theme.colors.white,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 20
    }
});

export default CrabCircleScreen;
