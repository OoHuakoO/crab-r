import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrivateStackParamsList } from '@src/typings/navigation';
import React, { FC, useEffect } from 'react';
import {
    BackHandler,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

type HomeScreenProps = NativeStackScreenProps<PrivateStackParamsList, 'Home'>;

const HomeScreen: FC<HomeScreenProps> = (props) => {
    const { navigation } = props;

    useEffect(() => {
        const onBackPress = () => {
            BackHandler.exitApp();
            return true;
        };
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );
        return () => {
            subscription.remove();
        };
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/crabRText.png')}
                    resizeMode="contain"
                />
                <Image
                    style={styles.crabImage}
                    source={require('../../assets/images/crabR.png')}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.text}>
                <Text style={styles.thaiText}>
                    นวัตกรรมการเพาะฟักสัตว์น้ำเศรษฐกิจ {'\n'}
                    กลุ่มชุมชนเขาสำเภาคว่ำ จังหวัดจันทบุรี
                </Text>
                <View style={styles.divider} />
                <Text style={styles.companyText}>
                    บริษัท ปตท.สำรวจและผลิตปิโตรเลียมจำกัด (มหาชน){'\n'}
                    ร่วมกับ {'\n'}
                    มหาวิทยาลัยราชภัฏรำไพพรรณี จ.จันทบุรี
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Image
                        source={require('../../assets/images/bookIcon.png')}
                        style={styles.buttonIcon}
                    />
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonText}>องค์ความรู้</Text>
                        <Text style={styles.buttonSubtext}>Knowledge</Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <Image
                        source={require('../../assets/images/bookIcon.png')}
                        style={styles.buttonIcon}
                    />
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonText}>บันทึกข้อมูล</Text>
                        <Text style={styles.buttonSubtext}>Save Data</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#133D79',
        height: '64%'
    },
    header: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: '34%'
    },

    logo: {
        width: 300,
        height: 100,
        marginBottom: 2
    },
    crabImage: {
        width: 440,
        height: 278
    },
    text: {
        marginTop: 130
    },
    thaiText: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 10,
        fontFamily: 'K2D-Regular',
        fontSize: 22,
        letterSpacing: 0,
        lineHeight: 28
    },
    companyText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'K2D-Regular',
        fontSize: 14,
        letterSpacing: 0.1,
        lineHeight: 20
    },
    buttonContainer: {
        padding: 20,
        marginTop: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 33,
        width: 250,
        height: 75,
        marginLeft: 85
    },
    buttonIcon: {
        width: 113,
        height: 113,
        marginLeft: -65
    },
    buttonTextContainer: {
        flex: 1
    },
    buttonText: {
        fontFamily: 'K2D-Regular',
        fontSize: 22,
        letterSpacing: 0,
        lineHeight: 28,
        fontWeight: 'bold',
        color: '#133D79',
        marginLeft: 20
    },
    buttonSubtext: {
        fontFamily: 'K2D-Regular',
        fontSize: 16,
        letterSpacing: 0.15,
        lineHeight: 24,
        fontWeight: 'bold',
        color: '#133D79',
        marginLeft: 20
    },
    divider: {
        height: 3,
        backgroundColor: '#FFFFFF',
        width: '90%',
        alignSelf: 'center',
        marginTop: 2,
        marginBottom: 8
    }
});

export default HomeScreen;
