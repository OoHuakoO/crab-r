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

type PhScreenProps = NativeStackScreenProps<HomeStackParamsList, 'Ph'>;

const PhScreen: FC<PhScreenProps> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/phWhite.png')}
                    textTitle="ข้อมูลค่ากรด-ด่าง (PH)"
                    textSubtitle="Acid-alkaline (PH) Value Information"
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
                            source={require('../../assets/images/phImg.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.rowText}>
                        <Text
                            variant="labelMedium"
                            style={[
                                styles.textSubDescription,
                                {
                                    width: '30%',
                                    marginRight: 20
                                }
                            ]}
                        >
                            ค่า PH น้อยกว่า 7.5
                        </Text>
                        <View style={styles.columnText}>
                            <Text
                                variant="labelMedium"
                                style={styles.textSubDescriptionWrap}
                            >
                                เติมปูนขาว
                                โดยนำปูนขาวมาละลายน้ำและตั้งทิ้งไว้จนน้ำ
                                มีความใสจึงนำไปเทใส่บ่อพักน้ำ โดย
                            </Text>
                            <Text
                                variant="labelMedium"
                                style={styles.textSubDescriptionWrap}
                            >
                                pH อยู่ในช่วง 7.2-7.4 ให้เติมปูนขาวปริมาณ 1
                                กิโลกรัม
                            </Text>
                            <Text
                                variant="labelMedium"
                                style={styles.textSubDescriptionWrap}
                            >
                                pH อยู่ในช่วง 7.0-7.1 ให้เติมขาวปริมาณ 2
                                กิโลกรัม
                            </Text>
                        </View>
                    </View>
                    <View style={styles.rowText}>
                        <Text
                            variant="labelMedium"
                            style={[
                                styles.textSubDescription,
                                {
                                    width: '30%',
                                    marginRight: 20
                                }
                            ]}
                        >
                            ค่า pH มากกว่า 8.5
                        </Text>
                        <View style={styles.columnText}>
                            <Text
                                variant="labelMedium"
                                style={styles.textSubDescriptionWrap}
                            >
                                เติมน้ำจืดจนกว่าจะมีค่า pH เท่ากับ 8.5
                            </Text>
                        </View>
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
        width: 500,
        height: 400
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textContainer: {
        marginTop: 20,
        gap: 10,
        marginBottom: 30,
        marginHorizontal: 30
    },
    rowText: {
        flexDirection: 'row',
        width: '100%'
    },
    columnText: {
        flexDirection: 'column',
        width: '65%'
    }
});

export default PhScreen;
