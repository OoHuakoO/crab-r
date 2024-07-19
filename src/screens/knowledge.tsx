import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

type KnowledgeScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'Knowledge'
>;

const KnowledgeScreen: FC<KnowledgeScreenProps> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/crabRText.png')}
                    resizeMode="contain"
                />
                <Image
                    style={styles.crabImage}
                    source={require('../../assets/images/crabR.png')}
                    resizeMode="contain"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#133D79',
        height: '64%'
    },
    header: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: '34%'
    },

    logo: {
        width: 300,
        height: 100,
        marginBottom: 2
    },
    crabImage: {
        width: 440,
        height: 278
    },
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
    buttonContainer: {
        padding: 20,
        marginTop: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 33,
        width: 250,
        height: 75,
        marginLeft: 85
    },
    buttonIcon: {
        width: 113,
        height: 113,
        marginLeft: -65
    },
    buttonTextContainer: {
        flex: 1
    },
    buttonText: {
        fontFamily: 'K2D-Regular',
        fontSize: 22,
        letterSpacing: 0,
        lineHeight: 28,
        fontWeight: 'bold',
        color: '#133D79',
        marginLeft: 20
    },
    buttonSubtext: {
        fontFamily: 'K2D-Regular',
        fontSize: 16,
        letterSpacing: 0.15,
        lineHeight: 24,
        fontWeight: 'bold',
        color: '#133D79',
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

export default KnowledgeScreen;
