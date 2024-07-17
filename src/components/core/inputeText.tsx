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

interface InputTextProps extends TextInputProps {
    errorText?: string;
    placeholder?: string;
    width?: number;
    borderColor?: string;
    secureText?: boolean;
    isPasswordVisible?: boolean;
    handleVisiblePassword?: () => void;
}

const InputText = forwardRef<TextInput, InputTextProps>((props, ref) => {
    const {
        placeholder,
        errorText,
        width,
        borderColor,
        secureText,
        isPasswordVisible,
        handleVisiblePassword
    } = props;
    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    { width: width || '100%' },
                    { borderColor: borderColor || 'gray' }
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    input: {
        height: 48,
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
