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

type CholineScreenProps = NativeStackScreenProps<HomeStackParamsList, 'Ph'>;

const CholineScreen: FC<CholineScreenProps> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/chlorineIcon.png')}
                    textTitle="ข้อมูลค่าคลอรีน"
                    textSubtitle="Chlorine Value Information"
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
                            source={require('../../assets/images/chlorineImg.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textDescription}>
                        ถ้าค่าคลอรีนไม่เท่ากับ 0
                        จะต้องพักน้ำต่อจนกว่าจะตรวจไม่เจอคลอรีน
                        จึงดำเนินการตรวจวัดคุณภาพน้ำค่าอื่น ๆ
                        ในกรณีที่ต้องการใช้น้ำเร่งด่วน
                        ไม่มีเวลาที่จะพักน้ำให้คลอรีนสลายหมดสามารถทำได้โดยที่เติมคลอรีน
                        ลงในบ่อพักทิ้งไว้ 24 ชั่วโมง
                    </Text>
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
        fontFamily: 'K2D-Regular',
        fontSize: 14
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
    }
});

export default CholineScreen;
