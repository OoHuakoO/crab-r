import { theme } from '@src/theme';
import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header: FC = () => {
    return (
        <View style={styles.header}>
            <View style={styles.headerContainer}>
                <View style={styles.columnHeader}>
                    <View style={styles.imageCrabRTextContainer}>
                        <Image
                            style={styles.imageCrabRText}
                            source={require('../../../assets/images/crabRText.png')}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.imagePttepContainer}>
                        <Image
                            style={styles.imagePttep}
                            source={require('../../../assets/images/pttep.png')}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.imageUniversityContainer}>
                        <Image
                            style={styles.imageUniversity}
                            source={require('../../../assets/images/university.png')}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 65,
        backgroundColor: theme.colors.white,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    columnHeader: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 50,
        width: '70%'
    },
    imageCrabRTextContainer: {
        width: '70%',
        height: 70,
        marginTop: 15,
        marginLeft: -70
    },
    imagePttepContainer: {
        width: '20%',
        height: 50,
        marginTop: 15,
        marginLeft: 70
    },
    imageUniversityContainer: {
        width: '15%',
        height: 50,
        marginTop: 15,
        marginLeft: 20
    },
    imageCrabRText: {
        width: '100%',
        height: '100%'
    },
    imagePttep: {
        width: '100%',
        height: '100%'
    },
    imageUniversity: {
        width: '100%',
        height: '100%'
    }
});
