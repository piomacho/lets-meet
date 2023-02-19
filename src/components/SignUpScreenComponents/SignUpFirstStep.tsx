import * as React from 'react';
import { useAppState } from '@src/state/appState';

import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text, Button, Input } from '@rneui/themed';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';

import { SignUpState } from '@src/state/signUpState';

export const SignUpFirstStep = observer(() => {
    const { routerState, signUpState } = useAppState();

    const { isFormValid, setEmail, registerUser } = signUpState;

    return (
        <View>
            <Formik
                initialValues={{}}
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
                                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Rejestracja</Text>

                                <Input label="Email" onChangeText={setEmail} />

                                <Button
                                    title="Dalej"
                                    style={{ width: 100, alignSelf: 'center', marginTop: 20 }}
                                    onPress={() => routerState.navigateToSignUpSecondStep()}
                                />

                                <Text style={{ textAlign: 'center', margin: 20, color: '#bbb' }}>
                                    -----------------
                                </Text>
                                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center' }}>
                                    <TouchableOpacity style={{}}>
                                        <Icon
                                            name="google"
                                            size={40}
                                            style={{ marginRight: 20 }}
                                            color={'#DB4437'}
                                            onPress={signUpState.loginWithGoogle}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{}}>
                                        <Icon
                                            name="apple1"
                                            size={40}
                                            color={'#000'}
                                            onPress={() => console.log('ds')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                }}
            </Formik>
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
