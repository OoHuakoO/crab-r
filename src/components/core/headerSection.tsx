/* eslint-disable react-native/no-inline-styles */
import { theme } from '@src/theme';
import React, { FC } from 'react';
import { DimensionValue, Image, StyleSheet, Text, View } from 'react-native';

interface HeaderSectionProps {
    image: any;
    textTitle: string;
    textSubtitle?: string;
    widthContainer?: DimensionValue;
    marginBottomTextTitle?: number;
    fontSizeTextTitle?: number;
}

const HeaderSection: FC<HeaderSectionProps> = (props) => {
    const {
        image,
        textTitle,
        textSubtitle,
        marginBottomTextTitle,
        fontSizeTextTitle
    } = props;
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.columnTitle}>
                <View style={styles.imageContainer}>
                    <Image
                        source={image}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.boxText}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={[
                                styles.buttonText,
                                {
                                    marginBottom: marginBottomTextTitle
                                        ? marginBottomTextTitle
                                        : -10,
                                    fontSize: fontSizeTextTitle
                                        ? fontSizeTextTitle
                                        : 32
                                }
                            ]}
                        >
                            {textTitle}
                        </Text>
                    </View>

                    {textSubtitle && (
                        <Text style={styles.buttonSubtext}>{textSubtitle}</Text>
                    )}
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
        justifyContent: 'center',
        width: '100%'
    },
    imageContainer: {
        width: 90,
        height: 90
    },
    image: {
        width: '100%',
        height: '100%'
    },
    boxText: {
        marginLeft: 20
    },
    buttonText: {
        fontFamily: 'K2D-Bold',
        color: theme.colors.white
    },
    buttonSubtext: {
        fontFamily: 'K2D-Bold',
        fontSize: 24,
        color: theme.colors.white
    },
    divider: {
        height: 5,
        backgroundColor: theme.colors.white,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 15
    }
});