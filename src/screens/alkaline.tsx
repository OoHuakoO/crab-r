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

type AlkalineScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'Alkaline'
>;

const AlkalineScreen: FC<AlkalineScreenProps> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/alkalineIcon.png')}
                    textTitle="ข้อมูลค่าอัลคาไลนิตี้รวม"
                    textSubtitle="Total Alkalinity Data"
                />
                <View style={styles.titleContainer}>
                    <Text variant="titleLarge" style={styles.textTitle}>
                        วิธีวัดค่าอัลคาไลนิตี้
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageBox}>
                        <Image
                            source={require('../../assets/images/alkalineImg.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.boxTitleButton}>
                    <Text style={styles.textTitleButton}>
                        ค่าอัลคาไลนิตี้รวม
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textDescription}>
                        - ค่าอัลคาไลนิตี้รวม
                        แสดงถึงความสามารถในการทำปฏิกิริยากับกรด
                    </Text>
                    <Text style={styles.textDescription}>
                        - ค่าอัลคาไลนิตีรวม ประกอบด้วยค่าคาร์บอเนต
                        ค่าไบคาร์บอเนตและค่าไฮดรอกไซด์
                    </Text>
                    <Text style={styles.textDescription}>
                        - ความสามารถในการต้านทานการเพิ่มและลดพีเอชของน้ำ
                        เป็นปัจจัยที่ทำให้ค่าพีเอชในรอบวันไม่เปลี่ยนแปลงมาก
                    </Text>
                    <Text style={styles.textDescription}>
                        - ถ้าค่าอัลคาไลนิตี้ต่ำ ค่าพีเอชก็จะตำและเปลี่ยนแปลงมาก
                        เป็นผลทำให้แพลงก์ตอนตายครั้งละมาก ๆ (น้ำล้ม)
                        ปูก็จะเครียดและป่วยเป็นโรคในเวลาต่อมา
                    </Text>
                    <Text style={styles.textDescription}>
                        - ถ้าค่าพีเอชต่ำและค่าอัลคาไลนิตี้
                        ปูก็จะลดการเจริญเติบโตและอัตรารอดต่ำ
                    </Text>
                    <Text style={styles.textDescription}>
                        - ถ้าค่าพีเอชสูงและค่าอัลคาไลนิดีสูง
                        ปูก็จะไม่สามารถลอกคราบได้ การแปลผล :
                        ค่าพีเอชและค่าอัลคาไลนิติที่เหมาะสมในการเลี้ยงปู
                    </Text>
                    <Text style={styles.textDescription}>
                        - ค่าพีเอชควรอยู่ในช่วง 7.7-7.9 ในช่วงเช้าและไม่เกิน
                        8.1-8.2 ในช่วงบ่ายและค่าอัลคาไลนิตี้อยู่ในช่วง 90-150
                        พีพีเอ็ม ไม่ควรต่ำกว่า 50 และไม่เกิน 180 พีพีเอ็ม
                    </Text>
                    <Text style={styles.textDescription}>
                        - ในเขตน้ำจืด ค่าพีเอชอาจสูง 7.9-8.2
                        ในช่วงเช้าและพยายามอย่าให้เกิน 8.5 ในช่วงบ่าย
                        และค่าอัลคาไลนิตี้ ควรอยู่ในช่วง 70-100 พีพีเอ็ม
                    </Text>
                </View>
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
    titleContainer: { marginBottom: 10, marginLeft: 30 },
    textTitle: {
        color: theme.colors.white,
        fontFamily: 'K2D-Bold'
    },
    imageContainer: {
        alignItems: 'center'
    },
    imageBox: {
        width: 380,
        height: 380
    },
    image: {
        width: '100%',
        height: '100%'
    },
    boxTitleButton: {
        backgroundColor: theme.colors.secondary,
        marginLeft: 20,
        width: 150,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        padding: 2
    },
    textTitleButton: {
        color: theme.colors.primary,
        fontFamily: 'K2D-Bold',
        fontSize: 14
    },
    textContainer: {
        marginBottom: 30,
        marginHorizontal: 30
    },
    textDescription: {
        color: theme.colors.white,
        fontFamily: 'K2D-Regular',
        fontSize: 12
    }
});

export default AlkalineScreen;
