import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface ImagePickerAvatarType {
    uri: string | null;
    onPress: () => void;
}

export const ImagePickerAvatar = observer(({ uri, onPress }: ImagePickerAvatarType) => {
    return (
        <View style={styles.avatar}>
            <Image style={styles.avatarImage} source={uri ? { uri } : require('./assets/avatar.jpeg')} />
            <TouchableOpacity style={styles.addButton} onPress={onPress}>
                <Icon name="pluscircle" size={50} color={'#000'} />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    avatar: {
        alignItems: 'center',
        marginTop: 30,
    },
    avatarImage: {
        height: 260,
        width: 260,
        overflow: 'hidden',
        borderColor: '#ffffff',
        borderWidth: 4,
        borderRadius: 260 / 2,
    },
    addButton: {
        height: 54,
        width: 54,
        backgroundColor: '#f2f2fC',
        borderRadius: 50,
        position: 'absolute',
        right: 104,
        bottom: 40,
    },
    addButtonIcon: {
        height: 54,
        width: 54,
    },
    usernameText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        marginTop: 12,
    },
});
