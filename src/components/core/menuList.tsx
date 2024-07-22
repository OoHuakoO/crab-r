import { theme } from '@src/theme';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuListProps {
    handlePress: () => void;
    image: any;
    textTitle: string;
    textSubtitle: string;
}

const MenuList: FC<MenuListProps> = (props) => {
    const { handlePress, image, textTitle, textSubtitle } = props;
    return (
        <TouchableOpacity onPress={handlePress} style={styles.rowMenu}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.textBox}>
                    <Text style={styles.columnButtonText}>{textTitle}</Text>
                    <Text style={styles.columnButtonSubtext}>
                        {textSubtitle}
                    </Text>
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
        marginBottom: 50,
        width: '80%'
    },
    imageContainer: {
        width: 80,
        height: 80,
        position: 'absolute',
        zIndex: 1,
        left: -10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textBox: {
        alignItems: 'center',
        marginLeft: 20
    },
    textContainer: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: theme.colors.secondary,
        width: '100%',
        alignItems: 'center'
    },
    columnButtonText: {
        fontFamily: 'K2D-Bold',
        fontSize: 16,
        color: theme.colors.primary,
        marginLeft: 20,
        marginBottom: -10
    },
    columnButtonSubtext: {
        fontFamily: 'K2D-Regular',
        fontSize: 14,
        color: theme.colors.primary,
        marginLeft: 20
    }
});
