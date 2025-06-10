/* eslint-disable react-native/no-inline-styles */
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { theme } from '@src/theme';
import React, { forwardRef, memo } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface InputTextProps extends TextInputProps {
    errorText?: string;
    placeholder?: string;
    height?: number;
    marginBottomContainer?: number;
    borderColor?: string;
    secureText?: boolean;
    calendarEggScoopDate?: boolean;
    calendarReleaseDate?: boolean;
    camera?: boolean;
    picture?: boolean;
    isPasswordVisible?: boolean;
    handleVisiblePassword?: () => void;
    handleTogglePopupCamera?: () => void;
    handleOpenCrabEggScoopDate?: () => void;
    handleOpenCrabReleaseDate?: () => void;
}

const InputText = forwardRef<TextInput, InputTextProps>((props, ref) => {
    const {
        placeholder,
        errorText,
        height,
        marginBottomContainer,
        borderColor,
        secureText,
        camera,
        picture,
        calendarEggScoopDate,
        calendarReleaseDate,
        isPasswordVisible,
        handleVisiblePassword,
        handleTogglePopupCamera,
        handleOpenCrabEggScoopDate,
        handleOpenCrabReleaseDate
    } = props;
    return (
        <View
            style={[
                styles.container,
                {
                    marginBottom: marginBottomContainer
                        ? marginBottomContainer
                        : 20
                }
            ]}
        >
            <TextInput
                style={[
                    styles.input,
                    {
                        height: height || 48,
                        borderColor: borderColor || 'gray',
                        backgroundColor: theme.colors.white
                    }
                ]}
                placeholder={placeholder}
                {...(isPasswordVisible !== undefined && {
                    secureTextEntry: !isPasswordVisible
                })}
                placeholderTextColor={theme.colors.textGray}
                {...props}
                ref={ref}
            />
            {secureText && (
                <TouchableOpacity
                    style={styles.toggle}
                    onPress={handleVisiblePassword}
                >
                    {isPasswordVisible ? (
                        <FontAwesomeIcon
                            icon={faEyeSlash}
                            color={theme.colors.textGray}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faEye}
                            color={theme.colors.textGray}
                        />
                    )}
                </TouchableOpacity>
            )}
            {camera && (
                <TouchableOpacity
                    style={styles.toggle}
                    onPress={handleTogglePopupCamera}
                >
                    <MaterialCommunityIcons
                        name="camera-plus"
                        size={30}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            )}

            {picture && (
                <TouchableOpacity
                    style={styles.toggle}
                    onPress={handleTogglePopupCamera}
                >
                    <FontAwesome
                        name="picture-o"
                        size={30}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            )}

            {calendarEggScoopDate && (
                <TouchableOpacity
                    style={styles.toggle}
                    onPress={handleOpenCrabEggScoopDate}
                >
                    <AntDesign
                        name="calendar"
                        size={30}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            )}
            {calendarReleaseDate && (
                <TouchableOpacity
                    style={styles.toggle}
                    onPress={handleOpenCrabReleaseDate}
                >
                    <AntDesign
                        name="calendar"
                        size={30}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            )}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    );
});

const styles = StyleSheet.create({
    toggle: {
        position: 'absolute',
        right: 10
    },
    container: {
        width: '100%',
        justifyContent: 'center'
    },
    input: {
        borderColor: theme.colors.textGray,
        borderWidth: 0.5,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontFamily: 'K2D-Medium',
        color: theme.colors.textGray
    },
    error: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4
    }
});

export default memo(InputText);
