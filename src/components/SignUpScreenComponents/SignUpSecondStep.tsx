import * as React from 'react';
import { useAppState } from '@src/state/appState';

import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text, Button, Input } from '@rneui/themed';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';

import { SignUpState } from '@src/state/signUpState';

export const SignUpSecondStep = observer(() => {
    const { routerState, signUpState } = useAppState();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    const {
        isFormValid,

        setPassword,
        setConfirmPassword,
        registerUser,
    } = signUpState;

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
                                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Ustaw hasło</Text>

                                <Input
                                    label="Hasło"
                                    onChangeText={setPassword}
                                    secureTextEntry={showPassword ? false : true}
                                    //@ts-expect-error
                                    rightIcon={() => (
                                        <Icon
                                            name="eyeo"
                                            size={20}
                                            color={'#000'}
                                            onPress={() => setShowPassword(!showPassword)}
                                        />
                                    )}
                                />
                                <Input
                                    label="Powtórz hasło"
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={showPasswordConfirm ? false : true}
                                    //@ts-expect-error
                                    rightIcon={() => (
                                        <Icon
                                            name="eyeo"
                                            size={20}
                                            color={'#000'}
                                            onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                        />
                                    )}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    );
                }}
            </Formik>
            <Button
                title="Dalej"
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
