import * as React from 'react';
import { useAppState } from '@src/state/appState';

import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text, Button, Input } from '@rneui/themed';
import { View, ActivityIndicator, StyleSheet, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';

import { AddEventState } from '@src/state/addEventState';

export const AddEvent = observer(() => {
    const { routerState } = useAppState();

    const [addEventState] = React.useState(() => new AddEventState());
    const { details, isFormValid, setEventName, setCategory, setNumberOfPeople, setDetails, setGender, createEvent } =
        addEventState;

    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Utwórz wydarzenie</Text>
            <Formik
                initialValues={{
                    eventName: '',
                    details: '',
                    numberOfPeople: 2,
                    category: '',
                }}
                onSubmit={() => {
                    createEvent();
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
                                <Input label="Nazwa wydarzenia" onChangeText={setEventName} />
                                {/* <Input
                                    placeholder="Details"
                                    label="Details"
                                    onChangeText={setDetails}
                                    multiline={true}
                                    numberOfLines={4}
                                    style={{ padding: 10 }}
                                /> */}
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
