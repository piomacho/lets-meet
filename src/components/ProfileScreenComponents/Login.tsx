import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Text, Button, Input } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAppState } from '@src/state/appState';
import { LoginState } from '@src/state/loginState';

export const Login = observer(() => {
    const { accountState } = useAppState();
    const [showPassword, setShowPassword] = React.useState(false);
    const [loginState] = React.useState(() => new LoginState());
    const { firebaseUser, logoutUser } = accountState;
    const { loginUser, setEmail, setPassword, error, successMessage } = loginState;

    return (
        <View>
            {firebaseUser === null ? (
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Logowanie</Text>
                    <Formik initialValues={{ email: '', password: '' }} onSubmit={loginUser}>
                        {({ handleSubmit }) => {
                            const submit = () => {
                                Keyboard.dismiss();
                                handleSubmit();
                            };
                            return (
                                <TouchableWithoutFeedback
                                    style={{ flex: 1 }}
                                    onPress={Keyboard.dismiss}
                                    accessible={false}>
                                    <View>
                                        <Input label="Email" onChangeText={setEmail} />
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
                                        {error === null ? null : (
                                            <Text style={{ color: 'red', margin: 10 }}>{error}</Text>
                                        )}

                                        <Button
                                            title="Zaloguj"
                                            style={{ width: 100, alignSelf: 'center', marginTop: 20 }}
                                            onPress={submit}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }}
                    </Formik>
                </View>
            ) : (
                <View>
                    <Text>Zalogowany jako {firebaseUser.email}</Text>
                    <Button
                        title="Wyloguj"
                        style={{ width: 100, alignSelf: 'center', marginTop: 20 }}
                        onPress={logoutUser}
                    />
                </View>
            )}
        </View>
    );
});

// onEmailSigninButtonPress = async (email: string, password: string) => {
//     crashlytics().log(`state: LoginState, method: onEmailSigninButtonPress -> email: ${email}`);
//     try {
//         let credential = auth.EmailAuthProvider.credential(email, password);
//         const { user } = await auth().signInWithCredential(credential);
//         this.verifyNewUser(user);
//     } catch (error) {
//         crashlytics().log(`state: LoginState, method: onEmailSigninButtonPress -> error: ${error}`);
//         const typedError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
//         this.setFirebaseError(typedError);
//     }
// };
