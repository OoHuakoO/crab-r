import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import MenuList from '@src/components/core/menuList';
import { theme } from '@src/theme';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

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
            path: 'Tide'
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
                <HeaderSection
                    image={require('../../assets/images/bookKnowledge.png')}
                    textTitle="องค์ความรู้"
                    textSubtitle="Knowledge"
                />
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
    menuListContainer: {
        alignItems: 'center',
        marginTop: 20
    }
});

export default KnowledgeScreen;
