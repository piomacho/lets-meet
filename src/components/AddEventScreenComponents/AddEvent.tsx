import * as React from 'react';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import { Text, Button } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { AddEventForm } from './AddEventForm';

export const AddEvent = observer(() => {
    const { routerState, addEventState } = useAppState();
    const { createEvent } = addEventState;

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
                {() => {
                    return (
                        <AddEventForm/>
                    );
                }}
            </Formik>
            <Button
                title="Create!"
                style={{ width: 100, alignSelf: 'center', marginTop: 20 }}
                onPress={createEvent}
            />
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
