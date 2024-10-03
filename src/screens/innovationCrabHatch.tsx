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

import { useSafeAreaInsets } from 'react-native-safe-area-context';

type InnovationCrabHatchScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'CrabCircle'
>;

const InnovationCrabHatchScreen: FC<InnovationCrabHatchScreenProps> = () => {
    const { top } = useSafeAreaInsets();
    return (
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <HeaderSection
                    image={require('../../assets/images/innovationCrabHatchIcon.png')}
                    textTitle="ระบบนวัตกรรมเพาะฟัก"
                    textSubtitle=""
                />
                <View style={styles.imageContainer1}>
                    <View style={styles.imageBox}>
                        <Image
                            source={require('../../assets/images/innovationCrabHatchImg.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>

                <View style={styles.imageContainer2}>
                    <View style={styles.imageBox}>
                        <Image
                            source={require('../../assets/images/innovationCrabHatchImg2.png')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
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
    imageContainer1: {
        alignItems: 'center',
        marginTop: 10
    },
    imageContainer2: {
        alignItems: 'center',
        marginBottom: 20
    },
    imageBox: {
        width: 380,
        height: 280
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default InnovationCrabHatchScreen;
