import moment from 'moment';
import { makeAutoObservable } from 'mobx';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { RouterState } from './routerState';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { firebaseErrors } from './errors';
import { getUserByEmail } from '@src/apiCalls/getUserByEmail';
import { createUser } from '@src/apiCalls/createUser';

interface PickerResponseType {
    assets: Array<{
        uri: string;
    }>;
}
export class SignUpState {
    date: Date | null = null;
    error: string | null = null;
    successMessage: string | null = null;
    isLoading: boolean = false;

    public firstName: string = '';
    public lastName: string = '';
    public age: string = '';
    public email: string = '';
    public password: string = '';
    public confirmPassword: string = '';
    public gender: string = '';

    public firstNameStatus: boolean | null = null;
    public lastNameStatus: boolean | null = null;
    public genderStatus: boolean | null = null;
    public postCodeStatus: boolean | null = null;
    public emailStatus: boolean | null = null;
    public passwordStatus: boolean | null = null;
    public confirmPasswordStatus: boolean | null = null;

    public pickerResponse: null | ImagePickerResponse = null;
    public isPickerVisible: boolean = false;

    constructor(private readonly routerState: RouterState) {
        makeAutoObservable(this);
    }

    public setDate = (currentDate: Date | null) => {
        this.date = currentDate;
    };
    public setPickerVisible = (isVisible: boolean) => {
        this.isPickerVisible = isVisible;
    };
    public setError = (error: string | null) => {
        this.error = error;
    };

    public setPickerResponse = (response: ImagePickerResponse) => {
        this.pickerResponse = response ?? null;
    };

    public setSuccessMessage = (successMessage: string) => {
        this.successMessage = successMessage;
    };

    public setLoading = (status: boolean) => {
        this.isLoading = status;
    };

    public setFirstName = (name: string) => {
        this.firstName = name;
    };
    public setGender = (name: string) => {
        this.gender = name;
    };

    public setLastName = (lastName: string) => {
        this.lastName = lastName;
    };

    public setAge = (age: string) => {
        this.age = age;
    };

    public setEmail = (email: string) => {
        this.email = email.toLowerCase();
    };
    public setPassword = (password: string) => {
        this.password = password;
    };
    public setConfirmPassword = (password: string) => {
        this.confirmPassword = password;
    };

    validateEmail = (email: string) => {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    };

    validate = (value: string) => {
        if (value === 'name') {
            this.firstNameStatus = this.firstName.length > 0;
        }
        if (value === 'surname') {
            this.lastNameStatus = this.lastName.length > 0;
        }
        if (value === 'email') {
            this.emailStatus = this.validateEmail(this.email);
        }

        if (value === 'password') {
            this.passwordStatus = this.password.length > 7;
        }
        if (value === 'passwordConfirm') {
            this.confirmPasswordStatus = this.confirmPassword.length > 7;
        }
    };

    public onDateChange = (selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        if (currentDate !== undefined) {
            this.setDate(currentDate);
        }
    };

    public get dateForSignup(): string {
        return moment(this.date).format('DD-MM-YYYY');
    }

    public get isGenderValid(): boolean {
        return this.gender !== '';
    }
    public get isDateValid(): boolean {
        return this.date !== null;
    }

    public get isFormValid(): boolean {
        return this.emailStatus === true && this.passwordStatus === true && this.confirmPasswordStatus === true;
    }

    onEmailRegisterButtonPress = async () => {
        try {
            let credential = auth.EmailAuthProvider.credential(this.email, this.password);
            return await this.registerOrLink(credential);
        } catch (error: unknown) {
            //@ts-expect-error
            this.setError(firebaseErrors[error.code]);
        }
    };

    onCameraPress = async () => {
        const response = await launchCamera({
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
        });
        console.log('response ', response);
        this.setPickerVisible(false);
    };

    onImageLibraryPress = async () => {
        launchImageLibrary({ selectionLimit: 1, mediaType: 'photo', includeBase64: false }, this.setPickerResponse);
        this.setPickerVisible(false);
    };
    setFirebaseError = (typedError: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        crashlytics().log(`state: SignupState, method: setFirebaseError, error: ${typedError.code}`);
        if (typedError.code in firebaseErrors) {
            this.setError(firebaseErrors[typedError.code]);
        } else {
            this.setError(typedError.message);
        }
    };

    registerOrLink = async (
        credential: FirebaseAuthTypes.AuthCredential,
    ): Promise<FirebaseAuthTypes.User | undefined> => {
        crashlytics().log('state: SignupState, method: registerOrLink');
        try {
            const { user } = await auth().createUserWithEmailAndPassword(credential.token, credential.secret);
            if (user !== undefined) {
                const userFoundInDB = await getUserByEmail(user, this.email);
                if (userFoundInDB.type === 'error') {
                    crashlytics().log('state: SignupState, method: registerOrLink');
                    console.error(userFoundInDB.message);
                }

                if (userFoundInDB.type === 'success' && userFoundInDB.data === null) {
                    const createdUserResponse = await createUser({
                        email: this.email,
                        google_id: null,
                        apple_id: null,
                        firebase_id: user.uid,
                    });

                    if (createdUserResponse.type === 'success') {
                        this.routerState.navigateToHome();
                    }
                }

                // For now
                // this.accountState.saveUsersDataToStorage(this.email, this.dateForSignup, this.postCode, this.gender);
                // this.routerState.navigateToEmailConfirmation();
                // this.accountState.sendConfirmation();
            }

            return user;
        } catch (error: unknown) {
            const typedError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
            this.setFirebaseError(typedError);
        }
    };

    registerUser = async () => {
        try {
            const fields = ['email', 'password', 'password-confirm'];

            fields.forEach(field => {
                this.validate(field);
            });
            if (this.isFormValid === false) {
                return;
            }

            const password = this.password;
            if (password !== this.confirmPassword) {
                this.setError('Passwords do not match');
                return;
            }

            this.setLoading(true);

            await this.onEmailRegisterButtonPress();

            this.setLoading(false);
        } catch (err) {
            this.setLoading(false);
        }
    };

    // registerUser = async () => {
    //     try {
    //         const fields = ['name', 'surname', 'email', 'postcode', 'password', 'password-confirm'];

    //         fields.forEach(field => {
    //             this.validate(field);
    //         });
    //         if (this.isFormValid === false) {
    //             return;
    //         }

    //         const password = this.password;
    //         if (password !== this.confirmPassword) {
    //             this.setError('Passwords do not match');
    //             return;
    //         }

    //         const minAgeDate = moment().subtract(13, 'years');
    //         const usersDate = moment(this.date);

    //         if (usersDate.isBefore(minAgeDate) === false) {
    //             this.setError('You have to be 13+ years old to create a new account');
    //             return;
    //         }

    //         this.setLoading(true);

    //         await this.onEmailRegisterButtonPress(this.email, this.password);

    //         this.setLoading(false);
    //     } catch (err) {
    //         this.setLoading(false);
    //     }
    // };

    loginWithGoogle = async () => {
        crashlytics().log('state: LoginState, method: loginWithGoogle');
        try {
            const data = await GoogleSignin.signIn();

            let credential = auth.GoogleAuthProvider.credential(data.idToken);

            await auth().signInWithCredential(credential);

            this.routerState.navigateToHome();
            // await this.signInOrLink('google_id', credential, data.user.email, userData);
            // this.setLoadingGoogle(false);
        } catch (error) {
            console.error(error);
            crashlytics().log(`state: LoginState, method: loginWithGoogle, Error:  ${error}`);
            // this.setLoadingGoogle(false);
        }
    };
}
