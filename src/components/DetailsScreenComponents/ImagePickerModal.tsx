import { observer } from 'mobx-react-lite';
import React from 'react';
import { SafeAreaView, Text, Pressable, StyleSheet, Modal, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface ImagePickerModalType {
    isVisible: boolean;
    onClose: () => void;
    onImageLibraryPress: () => void;
    onCameraPress: () => void;
}

export const ImagePickerModal = observer(
    ({ isVisible, onClose, onImageLibraryPress, onCameraPress }: ImagePickerModalType) => {
        return (
            <Modal animationType={'slide'} transparent={true} visible={isVisible} onRequestClose={onClose}>
                <TouchableOpacity style={styles.opacityWrapper} onPress={onClose}>
                    <View style={styles.modal}>
                        <SafeAreaView style={styles.buttons}>
                            <Pressable style={styles.button} onPress={onImageLibraryPress}>
                                <Icon name="picture" size={40} color={'#000'} />
                                <Text style={styles.buttonText}>Biblioteka</Text>
                            </Pressable>
                            <Pressable style={styles.button} onPress={onCameraPress}>
                                <Icon name="camera" size={40} color={'#000'} />
                                <Text style={styles.buttonText}>Aparat</Text>
                            </Pressable>
                        </SafeAreaView>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    },
);

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    opacityWrapper: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    buttonIcon: {
        width: 30,
        height: 30,
        margin: 10,
    },
    buttons: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,

        position: 'absolute',
        bottom: 0,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
