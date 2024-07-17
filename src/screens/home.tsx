import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '@src/theme';
import { PrivateStackParamsList } from '@src/typings/navigation';
import React, { FC, useEffect } from 'react';
import {
    BackHandler,
    Image,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';

type HomeScreenProps = NativeStackScreenProps<PrivateStackParamsList, 'Home'>;

const HomeScreen: FC<HomeScreenProps> = (props) => {
    const { navigation } = props;

    useEffect(() => {
        const onBackPress = () => {
            BackHandler.exitApp();
            return true;
        };
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );
        return () => {
            subscription.remove();
        };
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imagesContainer}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/carbRIcon.png')}
                    resizeMode="contain"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionLogin: {
        paddingHorizontal: 50,
        paddingTop: 50
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    imagesContainer: {
        width: 150,
        height: 150,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 20
    },
    label: {
        color: theme.colors.secondary
    },
    textLogin: {
        fontFamily: 'K2D-Medium',
        color: theme.colors.white,
        fontSize: 15,
        letterSpacing: 0.1,
        lineHeight: 20
    },
    textRegister: {
        fontFamily: 'K2D-Medium',
        color: theme.colors.textGray,
        fontSize: 15,
        letterSpacing: 0.1,
        lineHeight: 20
    }
});

export default HomeScreen;
