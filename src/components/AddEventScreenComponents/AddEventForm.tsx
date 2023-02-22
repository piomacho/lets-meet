import * as React from 'react';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text, Button, Input } from '@rneui/themed';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export const AddEventForm = observer(() => {
    const { routerState, addEventState } = useAppState();
    const {
        details,
        currentLatitude,
        currentLongitude,
        isLocationSet,
        setEventName,
        setCategory,
        setNumberOfPeople,
        setDetails,
        setGender
    } = addEventState;

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <Input label="Nazwa wydarzenia" onChangeText={setEventName} />

                <Input
                    editable
                    multiline
                    label="Opis"
                    numberOfLines={5}
                    onChangeText={text => setDetails(text)}
                    value={details}
                    style={{ padding: 10 }}
                />
                <Input
                    label="Liczba uczestników"
                    keyboardType="numeric"
                    onChangeText={setNumberOfPeople}
                />
                <View style={{ margin: 10 }}>
                    <Text>Wybierz kategorię</Text>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                            label: 'Wybierz kategorię',
                            value: null,
                        }}
                        onValueChange={(value: string) => setCategory(value)}
                        items={[
                            { label: 'Badminton', value: 'badminton' },
                            { label: 'Tenis', value: 'tenis' },
                            {
                                label: 'Fifa',
                                value: 'fifa',
                            },
                            {
                                label: 'Balet',
                                value: 'balet',
                            },
                            {
                                label: 'Koszykówka',
                                value: 'basketball',
                            },
                        ]}
                        style={{ ...pickerSelectStyles }}
                        //@ts-expect-error
                        Icon={() => <Icon name="down" size={20} color={'#000'} />}
                    />

                    <Text style={{ marginTop: 20 }}>Wybierz płeć uczestników</Text>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value: string) => setGender(value)}
                        placeholder={{
                            label: 'Wybierz płeć',
                            value: null,
                        }}
                        items={[
                            { label: 'Wszyscy są mile widziani !', value: 'all' },
                            { label: 'Kobiety', value: 'female' },
                            {
                                label: 'Mężczyzni',
                                value: 'male',
                            },
                            {
                                label: 'Zdefiniowana w opisie',
                                value: 'unknown',
                            },
                        ]}
                        style={{ ...pickerSelectStyles }}
                        //@ts-expect-error
                        Icon={() => <Icon name="down" size={20} color={'#000'} />}
                    />
                </View>
                <Text style={{ marginTop: 20 }}>Lokalizacja</Text>

                <Text>{currentLatitude ?? ''}</Text>
                <Text>{currentLongitude ?? ''}</Text>

                <Button
                    title={isLocationSet === null ? "Wybierz miejsce" : "Zmień miejsce"}
                    style={{ alignSelf: 'center', marginTop: 20 }}
                    onPress={routerState.navigateToChooseLocation}
                />
            </View>
        </TouchableWithoutFeedback>
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
