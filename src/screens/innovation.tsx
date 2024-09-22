import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import HeaderSection from '@src/components/core/headerSection';
import MenuList from '@src/components/core/menuList';
import { theme } from '@src/theme';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import {
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type InnovationScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'Innovation'
>;

const InnovationScreen: FC<InnovationScreenProps> = (props) => {
    const { navigation } = props;
    const { top } = useSafeAreaInsets();
    const menu = [
        {
            textTitle: 'ระบบนวัตกรรมเพาะฟัก',
            textSubtitle: '',
            image: require(`../../assets/images/crabCircuit.png`),
            path: 'CrabCircle'
        },
        {
            textTitle: 'ระบบดูดน้ำทะเล',
            textSubtitle: '',
            image: require(`../../assets/images/highAndLow.png`),
            app: 'eWeLink'
        },
        {
            textTitle: 'ระบบดูดน้ำเข้าระบบ',
            textSubtitle: '',
            image: require(`../../assets/images/ph.png`),
            app: 'eWeLink'
        },
        {
            textTitle: 'ระบบโซลาร์เซลล์',
            textSubtitle: '',
            image: require(`../../assets/images/alkalinityTotal.png`),
            app: 'fusionSolar'
        }
    ];
    const handleOpenUrl = (app) => {
        const apps = {
            eWeLink: {
                ios: 'https://apps.apple.com/th/app/ewelink/id1035163158',
                android:
                    'https://play.google.com/store/apps/details?id=com.coolkit'
            },
            fusionSolar: {
                ios: 'https://apps.apple.com/th/app/fusionsolar/id1529080383',
                android:
                    'https://intl.fusionsolar.huawei.com/pvmswebsite/app.html'
            }
        };

        const appUrls = apps[app] || apps.eWeLink;
        const url = Platform.OS === 'ios' ? appUrls.ios : appUrls.android;

        Linking.openURL(url).catch((err) =>
            console.error("Couldn't load page", err)
        );
    };

    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/bookKnowledge.png')}
                    textTitle="ระบบนวัตกรรม"
                    textSubtitle="Innovation System"
                />
                <View style={styles.menuListContainer}>
                    {menu?.map((item, index) => (
                        <MenuList
                            key={`menu-list-${index}`}
                            handlePress={() => {
                                if (item?.path) {
                                    navigation.navigate(
                                        item?.path as keyof HomeStackParamsList
                                    );
                                } else {
                                    handleOpenUrl(item?.app);
                                }
                            }}
                            textTitle={item?.textTitle}
                            textSubtitle={item?.textSubtitle}
                            image={item?.image}
                            textContainerPadding={15}
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

export default InnovationScreen;
