import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    CreateFcmToken,
    GetHistoryReadCount
} from '@src/services/notification';
import { notificationState, useSetRecoilState } from '@src/store';
import { theme } from '@src/theme';
import {
    HomeStackParamsList,
    PrivateStackParamsList
} from '@src/typings/navigation';
import React, { FC, useCallback, useEffect } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HomeScreenProps = CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamsList, 'SaveWaterAfter'>,
    BottomTabScreenProps<PrivateStackParamsList>
>;

const HomeScreen: FC<HomeScreenProps> = (props) => {
    const { navigation } = props;
    const setNotificationReadCount =
        useSetRecoilState<number>(notificationState);
    const { top } = useSafeAreaInsets();

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
        const response = await GetHistoryReadCount();
        if (response?.status === 200) {
            setNotificationReadCount(response?.data);
        }
    }, [setNotificationReadCount]);

    const requestUserPermissionAndCreateFcmToken = async () => {
        try {
            const authStatus = await messaging().requestPermission();
            console.log('createFcmToken authStatus', authStatus);

            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            console.log('createFcmToken before enabled', enabled);

            if (enabled) {
                console.log('createFcmToken after enabled', enabled);
                const token = await messaging().getToken();
                if (token) {
                    console.log(
                        'createFcmToken FCM Token React Native:',
                        token
                    );
                    await AsyncStorage.setItem(
                        'FcmToken',
                        JSON.stringify(token)
                    );
                    await CreateFcmToken({
                        fcmToken: token,
                        platform: Platform.OS
                    });
                }
            }
        } catch (err) {
            console.error('requestUserPermissionAndCreateFcmToken error:', err);
        }
    };

    useEffect(() => {
        requestUserPermissionAndCreateFcmToken();
    }, []);

    useEffect(() => {
        handleGetNotificationReadCount();
    }, [handleGetNotificationReadCount]);

    return (
        <ScrollView style={[styles.container, { marginTop: top }]}>
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
                        <Text variant="titleLarge" style={styles.buttonText}>
                            องค์ความรู้
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={styles.buttonSubtext}
                        >
                            Knowledge
                        </Text>
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
                        <Text variant="titleLarge" style={styles.buttonText}>
                            บันทึกข้อมูล
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={styles.buttonSubtext}
                        >
                            Record
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Innovation');
                    }}
                    style={styles.rowMenu3}
                >
                    <View style={styles.imagePencilBookIconContainer}>
                        <Image
                            source={require('../../assets/images/innovation.png')}
                            style={styles.imagePencilBookIcon}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text variant="titleLarge" style={styles.buttonText}>
                            ระบบนวัตกรรม
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={styles.buttonSubtext}
                        >
                            Innovation System
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        marginTop: StatusBar.currentHeight
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
        marginBottom: 50,
        width: '75%'
    },
    rowMenu3: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        width: '75%'
    },
    textContainer: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: theme.colors.secondary,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    buttonText: {
        fontFamily: 'K2D-Bold',
        color: theme.colors.primary,
        marginLeft: 20
    },
    buttonSubtext: {
        fontFamily: 'K2D-Bold',
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
