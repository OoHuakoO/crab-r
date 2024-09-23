import { theme } from '@src/theme';
import { ListPopupData } from '@src/typings/saveData';
import React, { FC } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Modal, Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface PopupSaveDataProp {
    visible: boolean;
    onClose: () => void;
    listData: ListPopupData[];
    onSave: () => void;
    loading: boolean;
}

const PopupSaveData: FC<PopupSaveDataProp> = (props) => {
    const { visible, onClose, listData, onSave, loading } = props;

    return (
        <Modal visible={visible} onDismiss={onClose}>
            <View style={styles.container}>
                <View style={styles.marginButtom15}>
                    <AntDesign
                        name="checkcircleo"
                        size={50}
                        color={theme.colors.success}
                    />
                </View>
                <View style={styles.marginButtom15}>
                    <Text variant="titleLarge" style={styles.textSaveData}>
                        บันทึกข้อมูลสำเร็จ
                    </Text>
                </View>
                {listData?.map((item) => (
                    <View key={item?.primary} style={styles.boxListData}>
                        <Text variant="bodyLarge" style={styles.textListData}>
                            {item?.primary}
                        </Text>
                        <Text variant="bodyLarge" style={styles.textListData}>
                            {item?.secondary}
                        </Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.buttonSave} onPress={onSave}>
                    {loading ? (
                        <ActivityIndicator
                            size="small"
                            color={theme.colors.white}
                        />
                    ) : (
                        <Text variant="bodyLarge" style={styles.textSave}>
                            ตกลง
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 20,
        backgroundColor: theme.colors.white,
        zIndex: 1,
        padding: 15
    },
    marginButtom15: {
        marginBottom: 15
    },
    textSaveData: {
        color: theme.colors.black
    },
    textListData: {
        color: theme.colors.white,
        fontFamily: 'K2D-Bold'
    },
    buttonSave: {
        paddingVertical: 6,
        paddingHorizontal: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: theme.colors.checkColor
    },
    textSave: {
        color: theme.colors.white,
        fontFamily: 'K2D-Bold'
    },
    boxListData: {
        marginBottom: 15,
        backgroundColor: theme.colors.primary,
        padding: 10,
        width: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PopupSaveData;
