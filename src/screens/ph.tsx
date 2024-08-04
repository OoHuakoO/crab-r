import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import { theme } from '@src/theme';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
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
                <View style={styles.buttonContainer}>
                    <View style={styles.rowButton}>
                        <View style={styles.boxButton}>
                            <View style={styles.textContainer}>
                                <Text style={styles.buttonText}>0.0</Text>
                            </View>
                        </View>
                        <View style={styles.boxButton}>
                            <View style={styles.textContainer}>
                                <Text style={styles.buttonText}>0.0</Text>
                            </View>
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
    titleContainer: { marginVertical: 5, marginLeft: 30 },
    textTitle: {
        color: theme.colors.white,
        fontFamily: 'K2D-Bold'
    },
    textDescription: {
        color: theme.colors.white,
        fontFamily: 'K2D-Medium'
    },
    buttonContainer: {
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center'
    },
    rowButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'green',
        width: '100%'
    },
    boxButton: {
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    textContainer: {
        backgroundColor: theme.colors.secondary,
        padding: 5,
        borderRadius: 20,
        alignItems: 'center',
        width: '50%'
    },
    buttonText: {
        fontFamily: 'K2D-Regular',
        fontSize: 14,
        color: theme.colors.primary
    }
});

export default PhScreen;
