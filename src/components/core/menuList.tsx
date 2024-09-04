/* eslint-disable react-native/no-inline-styles */
import { theme } from '@src/theme';
import React, { FC } from 'react';
import {
    DimensionValue,
    FlexAlignType,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Text } from 'react-native-paper';

interface MenuListProps {
    handlePress: () => void;
    image?: any;
    textTitle: string;
    textSubtitle?: string;
    textContainerPadding?: number;
    textBoxAlignItems?: FlexAlignType;
    textContainerAlignItems?: FlexAlignType;
    textBoxWidth?: DimensionValue;
    textBoxMarginLeft?: DimensionValue;
    textBoxGap?: number;
    columnButtonTextMarginLeft?: DimensionValue;
    columnButtonSubTextMarginLeft?: DimensionValue;
}

const MenuList: FC<MenuListProps> = (props) => {
    const {
        handlePress,
        image,
        textTitle,
        textSubtitle,
        textContainerPadding,
        textBoxAlignItems,
        textContainerAlignItems,
        textBoxWidth,
        textBoxMarginLeft,
        textBoxGap,
        columnButtonTextMarginLeft,
        columnButtonSubTextMarginLeft
    } = props;

    return (
        <TouchableOpacity onPress={handlePress} style={styles.rowMenu}>
            {image && (
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} />
                </View>
            )}

            <View
                style={[
                    styles.textContainer,
                    {
                        padding: textContainerPadding
                            ? textContainerPadding
                            : 5,
                        alignItems: textContainerAlignItems
                            ? textContainerAlignItems
                            : 'center'
                    }
                ]}
            >
                <View
                    style={{
                        alignItems: textBoxAlignItems
                            ? textBoxAlignItems
                            : 'center',
                        width: textBoxWidth ? textBoxWidth : null,
                        marginLeft: textBoxMarginLeft ? textBoxMarginLeft : 20,
                        gap: textBoxGap ? textBoxGap : 0
                    }}
                >
                    <Text
                        variant="titleMedium"
                        style={[
                            styles.columnButtonText,
                            {
                                marginBottom: textSubtitle ? -10 : 0,
                                marginLeft: columnButtonTextMarginLeft
                                    ? columnButtonTextMarginLeft
                                    : 20
                            }
                        ]}
                    >
                        {textTitle}
                    </Text>
                    {textSubtitle && (
                        <Text
                            variant="titleSmall"
                            style={[
                                styles.columnButtonSubText,
                                {
                                    marginLeft: columnButtonSubTextMarginLeft
                                        ? columnButtonSubTextMarginLeft
                                        : 20
                                }
                            ]}
                        >
                            {textSubtitle}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MenuList;

const styles = StyleSheet.create({
    rowMenu: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 30,
        width: '80%'
    },
    imageContainer: {
        width: 75,
        height: 75,
        position: 'absolute',
        zIndex: 1,
        left: -20
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textContainer: {
        borderRadius: 20,
        backgroundColor: theme.colors.secondary,
        width: '100%'
    },
    columnButtonText: {
        fontFamily: 'K2D-Bold',
        color: theme.colors.primary
    },
    columnButtonSubText: {
        color: theme.colors.primary,
        lineHeight: 27
    }
});
