import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import MenuList from '@src/components/core/menuList';
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

type KnowledgeScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'Knowledge'
>;

const KnowledgeScreen: FC<KnowledgeScreenProps> = (props) => {
    const { navigation } = props;
    const menu = [
        {
            textTitle: 'ข้อมูลวงจรปู',
            textSubtitle: 'Crab circuit information',
            image: require(`../../assets/images/crabCircuit.png`),
            path: 'Home'
        },
        {
            textTitle: 'ข้อมูลน้ำขึ้น-น้ำลง',
            textSubtitle: 'High and low tide information',
            image: require(`../../assets/images/highAndLow.png`),
            path: 'Home'
        },
        {
            textTitle: 'ข้อมูลค่ากรด-ด่าง (pH)',
            textSubtitle: 'Acid-alkaline (ph) value information',
            image: require(`../../assets/images/ph.png`),
            path: 'Home'
        },
        {
            textTitle: 'ข้อมูลค่าอัลคาไลนิตี้รวม',
            textSubtitle: 'Total alkalinity data',
            image: require(`../../assets/images/alkalinityTotal.png`),
            path: 'Home'
        },
        {
            textTitle: 'ข้อมูลค่าแอมโมเนีย',
            textSubtitle: 'Ammonia value information',
            image: require(`../../assets/images/ammonia.png`),
            path: 'Home'
        },
        {
            textTitle: 'ข้อมูลค่าแมกนีเซียมและแคลเซียม',
            textSubtitle: 'Magnesium and calcium information',
            image: require(`../../assets/images/mg.png`),
            path: 'Home'
        },
        {
            textTitle: 'ข้อมูลค่าคลอลีน',
            textSubtitle: 'Chlorine value information',
            image: require(`../../assets/images/cl.png`),
            path: 'Home'
        }
    ];
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.columnTitle}>
                    <View style={styles.imageBookKnowledgeContainer}>
                        <Image
                            source={require('../../assets/images/bookKnowledge.png')}
                            style={styles.imageBookKnowledge}
                        />
                    </View>
                    <View style={styles.knowledgeContainer}>
                        <View>
                            <Text style={styles.buttonText}>องค์ความรู้</Text>
                            <Text style={styles.buttonSubtext}>Knowledge</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.menuListContainer}>
                    {menu?.map((item, index) => (
                        <MenuList
                            key={`menu-list-${index}`}
                            handlePress={() =>
                                navigation.navigate(
                                    item?.path as keyof HomeStackParamsList
                                )
                            }
                            textTitle={item?.textTitle}
                            textSubtitle={item?.textSubtitle}
                            image={item?.image}
                        />
                    ))}
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
    columnTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center'
    },
    menuListContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    imageBookKnowledgeContainer: {
        width: 100,
        height: 100
    },
    imageBookKnowledge: {
        width: 120,
        height: 130,
        position: 'absolute',
        zIndex: 1
    },
    knowledgeContainer: {
        marginTop: 40,
        width: 180,
        height: 90
    },
    buttonText: {
        fontSize: 32,
        fontFamily: 'K2D-Bold',
        marginLeft: 20,
        marginBottom: -10,
        color: theme.colors.white
    },
    buttonSubtext: {
        fontFamily: 'K2D-Bold',
        fontSize: 24,
        color: theme.colors.white,
        marginLeft: 20
    },
    divider: {
        height: 3,
        backgroundColor: theme.colors.white,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 15
    }
});

export default KnowledgeScreen;
