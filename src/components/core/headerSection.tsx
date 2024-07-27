import { theme } from '@src/theme';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface HeaderSectionProps {
    image: any;
    textTitle: string;
    textSubtitle: string;
}

const HeaderSection: FC<HeaderSectionProps> = (props) => {
    const { image, textTitle, textSubtitle } = props;
    return (
        <View>
            <View style={styles.columnTitle}>
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} />
                </View>
                <View>
                    <Text style={styles.buttonText}>{textTitle}</Text>
                    <Text style={styles.buttonSubtext}>{textSubtitle}</Text>
                </View>
            </View>
            <View style={styles.divider} />
        </View>
    );
};

export default HeaderSection;

const styles = StyleSheet.create({
    columnTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        justifyContent: 'center'
    },
    imageContainer: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '90%',
        height: '100%'
    },
    buttonText: {
        fontSize: 32,
        fontFamily: 'K2D-Bold',
        marginLeft: 20,
        marginBottom: -20,
        color: theme.colors.white
    },
    buttonSubtext: {
        fontFamily: 'K2D-Bold',
        fontSize: 24,
        color: theme.colors.white,
        marginLeft: 20
    },
    divider: {
        height: 5,
        backgroundColor: theme.colors.white,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 15
    }
});
