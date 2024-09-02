import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GetHistoryReadCount } from '@src/services/notification';
import { notificationState, useSetRecoilState } from '@src/store';
import { theme } from '@src/theme';
import {
    HomeStackParamsList,
    PrivateStackParamsList
} from '@src/typings/navigation';
import React, { FC, useCallback, useEffect } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type HomeScreenProps = CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamsList, 'SaveWaterAfter'>,
    BottomTabScreenProps<PrivateStackParamsList>
>;

const HomeScreen: FC<HomeScreenProps> = (props) => {
    const { navigation } = props;
    const setNotificationReadCount =
        useSetRecoilState<number>(notificationState);

    useEffect(() => {
        const unsubscribe = messaging().onNotificationOpenedApp(
            (remoteMessage) => {
                console.log(
                    'Notification caused app to open from background state:',
                    remoteMessage.notification
                );
                navigation.navigate('Notification');
            }
        );

        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification
                    );
                    navigation.navigate('Notification');
                }
            });

        return unsubscribe;
    }, [navigation]);

    const handleGetNotificationReadCount = useCallback(async () => {
        const FcmTokenValue = await AsyncStorage.getItem('FcmToken');
        const FcmTokenJson = JSON.parse(FcmTokenValue);
        const response = await GetHistoryReadCount({ fcmToken: FcmTokenJson });
        if (response?.status === 200) {
            setNotificationReadCount(response?.data);
        }
    }, [setNotificationReadCount]);

    useEffect(() => {
        handleGetNotificationReadCount();
    }, [handleGetNotificationReadCount]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.imageCrabRTextContainer}>
                    <Image
                        style={styles.imageCrabRText}
                        source={require('../../assets/images/crabRText.png')}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.imageCrabContainer}>
                    <Image
                        style={styles.imageCrab}
                        source={require('../../assets/images/crabR.png')}
                        resizeMode="contain"
                    />
                </View>
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
            <View style={styles.menuContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Knowledge');
                    }}
                    style={styles.rowMenu1}
                >
                    <View style={styles.imageBookIconContainer}>
                        <Image
                            source={require('../../assets/images/bookIcon.png')}
                            style={styles.imageBookIcon}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.buttonText}>องค์ความรู้</Text>
                        <Text style={styles.buttonSubtext}>Knowledge</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SaveData');
                    }}
                    style={styles.rowMenu2}
                >
                    <View style={styles.imagePencilBookIconContainer}>
                        <Image
                            source={require('../../assets/images/pencilBookIcon.png')}
                            style={styles.imagePencilBookIcon}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.buttonText}>บันทึกข้อมูล</Text>
                        <Text style={styles.buttonSubtext}>Save Data</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary
    },
    header: {
        alignItems: 'center',
        height: 275,
        backgroundColor: theme.colors.white
    },
    imageCrabRTextContainer: {
        width: '100%',
        height: 100,
        marginTop: 20
    },
    imageCrabRText: {
        width: '100%',
        height: '100%'
    },
    imageCrabContainer: {
        width: '100%',
        height: '100%'
    },
    imageCrab: { width: '100%', height: '100%' },
    imagePencilBookIconContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        left: -20,
        zIndex: 1
    },
    imagePencilBookIcon: { width: '100%', height: '100%' },
    imageBookIconContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        zIndex: 1,
        left: -20
    },
    imageBookIcon: { width: '100%', height: '100%' },
    text: {
        marginTop: 130
    },
    thaiText: {
        textAlign: 'center',
        color: theme.colors.white,
        marginBottom: 10,
        fontFamily: 'K2D-Regular',
        fontSize: 22,
        letterSpacing: 0,
        lineHeight: 28
    },
    companyText: {
        textAlign: 'center',
        color: theme.colors.white,
        fontFamily: 'K2D-Regular',
        fontSize: 14,
        letterSpacing: 0.1,
        lineHeight: 20
    },
    menuContainer: {
        padding: 30,
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowMenu1: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 50,
        width: '75%'
    },
    rowMenu2: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        width: '75%'
    },
    textContainer: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: theme.colors.secondary,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    buttonText: {
        fontFamily: 'K2D-Bold',
        fontSize: 22,
        color: theme.colors.primary,
        marginLeft: 20,
        marginBottom: -10
    },
    buttonSubtext: {
        fontFamily: 'K2D-Bold',
        fontSize: 16,
        color: theme.colors.primary,
        marginLeft: 20
    },
    divider: {
        height: 3,
        color: theme.colors.white,
        width: '90%',
        alignSelf: 'center',
        marginTop: 2,
        marginBottom: 8
    }
});

export default HomeScreen;
