import { theme } from '@src/theme';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperButton> & {
    isDisabled?: boolean;
};

const Button = ({ isDisabled, mode, style, children, ...props }: Props) => (
    <PaperButton
        style={[
            styles.button,
            mode === 'contained' && {
                backgroundColor: isDisabled
                    ? theme.colors.textGray
                    : theme.colors.primary
            },
            style
        ]}
        labelStyle={styles.text}
        mode={mode}
        {...props}
    >
        {children}
    </PaperButton>
);

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 26
    }
});

export default memo(Button);
