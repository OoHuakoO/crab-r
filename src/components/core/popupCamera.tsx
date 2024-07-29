import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { theme } from '@src/theme';
import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Modal, Text } from 'react-native-paper';

interface PopupCameraProp {
    visible: boolean;
    type: string;
    onClose: () => void;
    openImagePicker: (type: string) => void;
    handleCameraLaunch: (type: string) => void;
    selectedImage: string | null;
}

const PopupCamera: FC<PopupCameraProp> = (props) => {
    const {
        visible,
        type,
        onClose,
        selectedImage,
        openImagePicker,
        handleCameraLaunch
    } = props;
    const handleImageSelection = (typeImage: string) => {
        onClose();
        openImagePicker(typeImage);
    };

    const handleCameraLaunchAndClose = (typeImage: string) => {
        onClose();
        handleCameraLaunch(typeImage);
    };
    return (
        <Modal visible={visible} onDismiss={onClose}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} activeOpacity={0.5}>
                        <FontAwesomeIcon icon={faXmark} size={25} />
                    </TouchableOpacity>
                </View>
                <View style={styles.wraper}>
                    {selectedImage ? (
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode="contain"
                                style={styles.selectedImage}
                                source={{ uri: selectedImage }}
                            />
                        </View>
                    ) : (
                        <View style={styles.emptyImage}>
                            <FontAwesomeIcon
                                color={theme.colors.primary}
                                icon={faCamera}
                                size={34}
                            />
                        </View>
                    )}

                    <Button
                        style={styles.button}
                        onPress={() => handleImageSelection(type)}
                    >
                        <Text style={styles.text} variant="bodyLarge">
                            Open Gallery
                        </Text>
                    </Button>
                    <Button
                        style={styles.button}
                        onPress={() => handleCameraLaunchAndClose(type)}
                    >
                        <Text style={styles.text} variant="bodyLarge">
                            Open Camera
                        </Text>
                    </Button>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        marginHorizontal: 20,
        backgroundColor: theme.colors.white,
        zIndex: 1
    },
    header: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 20
    },
    wraper: {
        padding: 25,
        gap: 20
    },
    button: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: theme.colors.primary,
        borderRadius: 10
    },
    text: {
        color: theme.colors.white
    },
    imageContainer: {
        alignSelf: 'center',
        width: 200,
        height: 200
    },
    selectedImage: {
        width: '100%',
        height: '100%'
    },
    emptyImage: {
        width: 110,
        height: 110,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: 12
    }
});

export default PopupCamera;
