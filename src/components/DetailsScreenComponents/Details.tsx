import * as React from 'react';
import { useAppState } from '@src/state/appState';

import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text, Button, Input } from '@rneui/themed';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import { ImagePickerAvatar } from './ImagePickerAvatar';
import { ImagePickerModal } from './ImagePickerModal';

export const Details = observer(() => {
    const { routerState, signUpState } = useAppState();

    const {
        isFormValid,
        pickerResponse,
        isPickerVisible,
        setPickerVisible,
        onImageLibraryPress,
        setFirstName,
        setLastName,
        setAge,
        setGender,
        setEmail,
        registerUser,
        onCameraPress,
    } = signUpState;

    const uri = (pickerResponse?.assets && pickerResponse.assets[0].uri) ?? null;
    return (
        <View>
            <Formik
                initialValues={{
                    eventName: '',
                    details: '',
                    numberOfPeople: 2,
                    category: '',
                }}
                onSubmit={() => {
                    registerUser();
                }}>
                {({ handleSubmit }) => {
                    const submit = () => {
                        if (isFormValid) {
                            handleSubmit();
                        }
                    };
                    return (
                        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Uzupełnij dane</Text>

                                <Input label="Imię" onChangeText={setFirstName} />
                                <Input label="Nazwisko" onChangeText={setLastName} />
                                <Input label="Email" onChangeText={setEmail} />

                                <Input label="Wiek" keyboardType="numeric" onChangeText={setAge} />
                                <View style={{ margin: 10 }}>
                                    <Text>Płeć</Text>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{
                                            label: 'Wybierz płeć',
                                            value: null,
                                        }}
                                        onValueChange={(value: string) => setGender(value)}
                                        items={[
                                            { label: 'Kobieta', value: 'female' },
                                            { label: 'Męczyzna', value: 'male' },
                                            {
                                                label: 'Osoba niebinarna',
                                                value: 'nonbinary',
                                            },
                                            {
                                                label: 'Wolę nie określać',
                                                value: 'not-specified',
                                            },
                                        ]}
                                        style={{ ...pickerSelectStyles }}
                                        //@ts-expect-error
                                        Icon={() => <Icon name="down" size={20} color={'#000'} />}
                                    />
                                </View>
                                <View style={{ margin: 10 }}>
                                    <Text>Dodaj zdjęcie</Text>
                                    <ImagePickerAvatar uri={uri} onPress={() => setPickerVisible(true)} />
                                    <ImagePickerModal
                                        isVisible={isPickerVisible}
                                        onClose={() => setPickerVisible(false)}
                                        onImageLibraryPress={onImageLibraryPress}
                                        onCameraPress={onCameraPress}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                }}
            </Formik>
            <Button
                title="Next"
                style={{ width: 100, alignSelf: 'center', marginTop: 20 }}
                onPress={routerState.navigateToInviteGuests}
            />
        </View>
    );
});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        color: '#91919F',
    },
    inputAndroid: {
        fontSize: 16,
        color: '#91919F',
    },
    placeholder: {
        color: '#91919F',
    },
});
