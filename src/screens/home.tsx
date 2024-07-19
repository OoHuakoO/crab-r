import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '@src/theme';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamsList, 'Home'>;

const HomeScreen: FC<HomeScreenProps> = (props) => {
    const { navigation } = props;

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
                        <View>
                            <Text style={styles.buttonText}>องค์ความรู้</Text>
                            <Text style={styles.buttonSubtext}>Knowledge</Text>
                        </View>
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
                        <View>
                            <Text style={styles.buttonText}>บันทึกข้อมูล</Text>
                            <Text style={styles.buttonSubtext}>Save Data</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#133D79'
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
        zIndex: 1,
        left: -40
    },
    imagePencilBookIcon: { width: '100%', height: '100%' },
    imageBookIconContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        zIndex: 1,
        left: -40
    },
    imageBookIcon: { width: '100%', height: '100%' },
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
        width: '70%'
    },
    rowMenu2: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        width: '70%'
    },
    textContainer: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: theme.colors.secondary,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
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
        backgroundColor: '#FFFFFF',
        width: '90%',
        alignSelf: 'center',
        marginTop: 2,
        marginBottom: 8
    }
});

export default HomeScreen;
