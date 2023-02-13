import * as React from 'react';
import { useAppState } from '@src/state/appState';

import { observer } from 'mobx-react-lite';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
    Text,
} from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';

import { AddEventState } from '@src/state/addEventState';

export const AddEvent = observer(() => {
    const { routerState } = useAppState();

    const [addEventState] = React.useState(() => new AddEventState());
    const {
        error,
        successMessage,
        date,
        isLoading,
        eventName,
        details,
        numberOfPeople,
        gender,
        category,
        eventNameStatus,
        detailsStatus,
        numberOfPeopleStatus,
        categoryStatus,
        isFormValid,
        setEventName,
        setCategory,
        setNumberOfPeople,
        setDetails,
        setGender,
        onDateChange,
        createEvent,
        validate,
    } = addEventState;

    const isIos = Platform.OS === 'ios';
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
                            <Text>Form here</Text>
                        </TouchableWithoutFeedback>
                    );
                }}
            </Formik>
            <Button title="Next" onPress={routerState.navigateToInviteGuests} />
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
