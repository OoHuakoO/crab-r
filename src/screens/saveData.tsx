import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import { theme } from '@src/theme';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Text } from 'react-native-paper';

type SaveDataScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'SaveData'
>;

const SaveDataScreen: FC<SaveDataScreenProps> = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.columnTitle}>
                    <View style={styles.imageSaveDataContainer}>
                        <Image
                            source={require('../../assets/images/saveData.png')}
                            style={styles.imageSaveData}
                        />
                    </View>
                    <View style={styles.SaveDataContainer}>
                        <View>
                            <Text style={styles.buttonText}>บันทึกข้อมูล</Text>
                            <Text style={styles.buttonSubtext}>Save Data</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.divider} />
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={styles.rowMenu1}
                    >
                        <View style={styles.imageBeforeContainer}>
                            <Image
                                source={require('../../assets/images/before.png')}
                                style={styles.imageBefore}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.columnButtonText}>
                                    บันทึกข้อมูลคุณภาพน้ำ{'\n'}ก่อนเข้าบ่อพักน้ำ
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={styles.rowMenu2}
                    >
                        <View style={styles.imageAfterContainer}>
                            <Image
                                source={require('../../assets/images/after.png')}
                                style={styles.imageAfter}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.columnButtonText}>
                                    บันทึกข้อมูลคุณภาพน้ำ{'\n'}หลังการพักน้ำได้
                                    7 วัน
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={styles.rowMenu3}
                    >
                        <View style={styles.imageHatchingContainer}>
                            <Image
                                source={require('../../assets/images/hatching.png')}
                                style={styles.imageHatching}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.columnButtonText}>
                                    บันทึกข้อมูลการเพาะฟัก
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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
        marginTop: 65
    },
    columnTitle: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 70,
        width: '70%'
    },
    imageSaveDataContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        zIndex: 1,
        left: 55
    },
    imageSaveData: {
        width: 110,
        height: 120,
        position: 'absolute',
        zIndex: 1,
        top: 1
    },
    SaveDataContainer: {
        marginTop: 25,
        marginLeft: 175,
        width: 180,
        height: 90
    },
    buttonText: {
        fontSize: 32,
        fontFamily: 'K2D-Bold',
        marginLeft: 15,
        marginBottom: -10,
        color: theme.colors.white
    },
    buttonSubtext: {
        fontFamily: 'K2D-Bold',
        fontSize: 24,
        color: theme.colors.white,
        marginLeft: 20
    },
    columnButtonText: {
        fontFamily: 'K2D-Bold',
        fontSize: 18,
        color: theme.colors.primary,
        marginLeft: 20,
        marginBottom: -10
    },
    divider: {
        height: 3,
        backgroundColor: theme.colors.white,
        width: '90%',
        alignSelf: 'center',
        marginTop: -40,
        marginBottom: 15
    },
    menuContainer: {
        padding: 30,
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: theme.colors.secondary,
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 80
    },
    rowMenu1: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 25,
        width: '75%',
        marginTop: 15
    },
    imageBeforeContainer: {
        width: 95,
        height: 95,
        position: 'absolute',
        zIndex: 1,
        left: 25
    },
    imageBefore: { width: '100%', height: '100%' },
    rowMenu2: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 25,
        width: '75%',
        marginTop: 15
    },
    imageAfterContainer: {
        width: 95,
        height: 95,
        position: 'absolute',
        zIndex: 1,
        left: 25
    },
    imageAfter: { width: '100%', height: '100%' },
    rowMenu3: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 25,
        width: '75%',
        marginTop: 15
    },
    imageHatchingContainer: {
        width: 95,
        height: 95,
        position: 'absolute',
        zIndex: 1,
        left: 25
    },
    imageHatching: { width: '100%', height: '100%' }
});

export default SaveDataScreen;
