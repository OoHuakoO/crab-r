/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertDialog from '@src/components/core/alertDialog';
import Header from '@src/components/core/header';
import { LIMIT } from '@src/constant';
import { GetHistories, GetHistoryReadCount } from '@src/services/notification';
import { notificationState, useSetRecoilState } from '@src/store';
import { theme } from '@src/theme';
import { PrivateStackParamsList } from '@src/typings/navigation';
import { GetHistoriesResponse } from '@src/typings/notification';
import React, { FC, useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IonIcons from 'react-native-vector-icons/Ionicons';

type NotificationScreenProps = NativeStackScreenProps<
    PrivateStackParamsList,
    'Notification'
>;

const NotificationScreen: FC<NotificationScreenProps> = (props) => {
    const { navigation } = props;
    const { top } = useSafeAreaInsets();
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [contentDialog, setContentDialog] = useState<string>('');
    const [listNotification, setListNotification] = useState<
        GetHistoriesResponse[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [stopFetchMore, setStopFetchMore] = useState<boolean>(true);
    const setNotificationReadCount =
        useSetRecoilState<number>(notificationState);

    const handleCloseDialog = useCallback(() => {
        setVisibleDialog(false);
    }, []);

    const handleOnEndReached = async () => {
        try {
            setLoading(true);
            if (!stopFetchMore) {
                const FcmTokenValue = await AsyncStorage.getItem('FcmToken');
                const FcmTokenJson = JSON.parse(FcmTokenValue);
                const res = await GetHistories({
                    page: page + 1,
                    limit: LIMIT,
                    fcmToken: FcmTokenJson
                });
                if (res?.status === 200) {
                    setPage(page + 1);
                    setListNotification([...listNotification, ...res?.data]);
                } else {
                    setVisibleDialog(true);
                    setContentDialog('Something went wrong get data');
                    return;
                }
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setStopFetchMore(true);
            setLoading(false);
            setVisibleDialog(true);
            setContentDialog('Something went wrong get data');
        }
    };

    const handleGetHistories = useCallback(async () => {
        try {
            setLoading(true);
            setPage(1);
            const FcmTokenValue = await AsyncStorage.getItem('FcmToken');
            const FcmTokenJson = JSON.parse(FcmTokenValue);
            const res = await GetHistories({
                page: 1,
                limit: LIMIT,
                fcmToken: FcmTokenJson
            });
            if (res?.status === 200) {
                setListNotification(res?.data);
            } else {
                setVisibleDialog(true);
                setContentDialog('Something went wrong get data');
                return;
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setVisibleDialog(true);
            setContentDialog('Something went wrong get data');
        }
    }, []);

    const handleGetNotificationReadCount = useCallback(async () => {
        const FcmTokenValue = await AsyncStorage.getItem('FcmToken');
        const FcmTokenJson = JSON.parse(FcmTokenValue);
        const response = await GetHistoryReadCount({ fcmToken: FcmTokenJson });
        if (response?.status === 200) {
            setNotificationReadCount(response?.data);
        }
    }, [setNotificationReadCount]);

    useFocusEffect(
        useCallback(() => {
            handleGetHistories();
            handleGetNotificationReadCount();
        }, [handleGetHistories, handleGetNotificationReadCount])
    );

    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <Header />
            <AlertDialog
                textContent={contentDialog}
                visible={visibleDialog}
                handleClose={handleCloseDialog}
                handleConfirm={handleCloseDialog}
            />
            <View
                style={{
                    flex: 1,
                    marginTop: 70,
                    marginBottom: 10,
                    justifyContent:
                        listNotification?.length === 0 ? 'center' : null,
                    alignItems: listNotification?.length === 0 ? 'center' : null
                }}
            >
                {listNotification?.length > 0 ? (
                    <FlatList
                        data={listNotification}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('HistoryStack', {
                                        screen: 'CrabHatchDetail',
                                        params: { id: item?.crabHatchId }
                                    });
                                }}
                                style={styles.rowMenu}
                            >
                                <View style={styles.imageContainer}>
                                    <IonIcons
                                        name="notifications-outline"
                                        size={30}
                                        color={theme.colors.white}
                                    />
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.title}>
                                        {item?.title}
                                    </Text>
                                    <Text style={styles.message}>
                                        {`สถานที่ : ${item?.location}`}
                                    </Text>
                                    <Text style={styles.message}>
                                        {`บ่อที่ : ${item?.pool}`}
                                    </Text>
                                    <Text style={styles.message}>
                                        {item?.message}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item._id.toString()}
                        onRefresh={() => console.log('refreshing')}
                        refreshing={loading}
                        onEndReached={handleOnEndReached}
                        onEndReachedThreshold={0.5}
                        onScrollBeginDrag={() => setStopFetchMore(false)}
                    />
                ) : loading ? (
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.white}
                    />
                ) : (
                    <Text variant="headlineSmall" style={styles.titleNotFound}>
                        Notification Not Found
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary
    },
    rowMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: theme.colors.secondary,
        borderWidth: 0.5,
        borderBottomColor: theme.colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 5
    },
    imageContainer: {
        width: 60,
        height: 60,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 1
    },
    title: {
        fontFamily: 'K2D-Bold',
        fontSize: 16,
        color: theme.colors.primary
    },
    message: {
        fontFamily: 'K2D-Regular',
        fontSize: 14,
        color: theme.colors.primary
    },
    titleNotFound: {
        color: theme.colors.white,
        fontFamily: 'K2D-Bold'
    }
});

export default NotificationScreen;
