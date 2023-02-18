import { makeAutoObservable } from 'mobx';
import crashlytics from '@react-native-firebase/crashlytics';
// import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { firebaseErrors } from './errors';

export type ProviderType = 'google_id' | 'facebook_id' | 'apple_id' | 'firebase_id';
interface LoginUserType {
    email: string;
    password: string;
}
// interface UserDataType {
//     email: string;
//     name: string;
//     surname: string;
//     gender: string;
//     postcode: string;
//     date_of_birth: string;
//     firebase_id: string | null;
//     google_id: string | null;
//     apple_id: string | null;
//     facebook_id: string | null;
// }

// interface SocialUserDataType {
//     email: string;
//     name: string;
//     surname: string;
//     gender: string;
//     postcode: string;
//     date_of_birth: string;
// }

export class LoginState {
    error: string | null = null;
    successMessage: string | null = null;
    isLoading: boolean = false;
    isLoadingGmail: boolean = false;
    isLoadingApple: boolean = false;

    public email: string = '';
    public password: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    public setError = (error: string | null) => {
        this.error = error;
    };
    public setSuccessMessage = (successMessage: string | null) => {
        this.successMessage = successMessage;
    };

    public setLoading = (status: boolean) => {
        this.isLoading = status;
    };

    // loginWithApple = async () => {
    //     crashlytics().log('state: LoginState, method: loginWithApple');
    //     this.setLoadingApple(true);
    //     // Start the sign-in request
    //     const appleAuthRequestResponse = await appleAuth.performRequest({
    //         requestedOperation: appleAuth.Operation.LOGIN,
    //         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    //     });

    //     // Ensure Apple returned a user identityToken
    //     if (!appleAuthRequestResponse.identityToken) {
    //         crashlytics().log(
    //             'state: LoginState, method: loginWithApple, Apple Sign-In failed - no identify token returned',
    //         );
    //         throw new Error('Apple Sign-In failed - no identify token returned');
    //     }

    //     // Create a Firebase credential from the response
    //     const { identityToken, nonce } = appleAuthRequestResponse;
    //     const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    //     crashlytics().log(`state: LoginState, method: loginWithApple ->  ${appleAuthRequestResponse}`);
    //     const email = appleAuthRequestResponse.email ?? '';
    //     if (email !== '') {
    //         const userData: SocialUserDataType = {
    //             email: email,
    //             name: appleAuthRequestResponse.fullName?.givenName ?? '',
    //             surname: appleAuthRequestResponse.fullName?.familyName ?? '',
    //             date_of_birth: '-',
    //             postcode: '-',
    //             gender: '-',
    //         };

    //         await this.signInOrLink('apple_id', appleCredential, email, userData);
    //     } else {
    //         // Apple returns email only first time - so by now user should be in database
    //         await auth().signInWithCredential(appleCredential);
    //         this.accountState.usersResource.refresh();
    //     }

    //     this.setLoadingGoogle(false);
    // };

    // loginWithGoogle = async () => {
    //     crashlytics().log('state: LoginState, method: loginWithGoogle');
    //     try {
    //         this.setLoadingGoogle(true);
    //         const data = await GoogleSignin.signIn();
    //         const fullName = typeof data.user.name ? data.user.name?.split(' ') : null;
    //         const firstName = fullName === null || fullName === undefined || fullName.length === 0 ? '-' : fullName[0];
    //         const lastName = fullName === null || fullName === undefined || fullName.length < 2 ? '-' : fullName[1];

    //         const userData: SocialUserDataType = {
    //             email: data.user.email,
    //             name: data.user.givenName ?? firstName ?? '-',
    //             surname: data.user.familyName ?? lastName ?? '-',
    //             date_of_birth: '-',
    //             postcode: '-',
    //             gender: '-',
    //         };
    //         let credential = auth.GoogleAuthProvider.credential(data.idToken);

    //         await this.signInOrLink('google_id', credential, data.user.email, userData);
    //         this.setLoadingGoogle(false);
    //     } catch (error) {
    //         console.error(error);
    //         crashlytics().log(`state: LoginState, method: loginWithGoogle, Error:  ${error}`);
    //         this.setLoadingGoogle(false);
    //     }
    // };
    // //FOR NOW
    // loginWithAndroid = async () => {
    //     crashlytics().log('state: LoginState, method: loginWithFacebook');

    //     try {
    //         this.setLoadingFb(true);
    //         const loginResult = await LoginManager.logInWithPermissions(['email']);

    //         if (loginResult.isCancelled) {
    //             console.log('User cancelled the login process');
    //             this.setLoadingFb(false);
    //             return;
    //         }

    //         let token = await AccessToken.getCurrentAccessToken();
    //         if (!token) {
    //             this.setLoadingFb(false);
    //             crashlytics().log(
    //                 'state: LoginState, method: loginWithFacebook -> Something went wrong obtaining access token',
    //             );
    //             throw 'Something went wrong obtaining access token';
    //         }
    //         const credential = auth.FacebookAuthProvider.credential(token.accessToken);
    //         const infoRequest = new GraphRequest('/me?fields=name,email', undefined, async (error, result) => {
    //             if (error) {
    //                 crashlytics().log(`state: LoginState, method: loginWithFacebook -> ${error}`);
    //                 console.log(error.message);
    //             } else {
    //                 const email = typeof result?.email === 'string' ? result?.email : null;
    //                 const fullName = typeof result?.name === 'string' ? result?.name.split(' ') : null;
    //                 const firstName = fullName === null || fullName.length === 0 ? '-' : fullName[0];
    //                 const lastName = fullName === null || fullName.length < 2 ? '-' : fullName[1];
    //                 if (email === null) {
    //                     console.error('Email not fetched from FB');
    //                     crashlytics().log('state: LoginState, method: loginWithFacebook -> Email not fetched from FB');
    //                     return;
    //                 }

    //                 const userData: SocialUserDataType = {
    //                     email: email,
    //                     name: firstName,
    //                     surname: lastName,
    //                     date_of_birth: '-',
    //                     postcode: '-',
    //                     gender: '-',
    //                 };
    //                 await this.signInOrLink('facebook_id', credential, email, userData);
    //                 this.setLoadingFb(false);
    //                 return;
    //             }
    //         });
    //         new GraphRequestManager().addRequest(infoRequest).start();
    //     } catch (error) {
    //         this.setLoadingFb(false);
    //         crashlytics().log(`state: LoginState, method: loginWithFacebook, Error:  ${error}`);
    //         console.error(error);
    //     }
    // };

    setLoadingGoogle = (val: boolean) => {
        this.isLoadingGmail = val;
    };

    setLoadingApple = (val: boolean) => {
        this.isLoadingApple = val;
    };

    loginUser = async () => {
        console.log(' login');
        crashlytics().log(`state: LoginState, method: loginUser -> data: ${this.email}, ${this.password}`);
        try {
            if (this.email === '' || this.password === '') {
                return;
            }
            this.setLoading(true);

            await this.onEmailSigninButtonPress(this.email, this.password);
            this.setSuccessMessage('Zalogowano ');
            this.setLoading(false);
        } catch (error) {
            crashlytics().log(`state: LoginState, method: loginUser -> error: ${error}`);
            const typedError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
            const errorMessage = typedError.message;
            console.error(errorMessage);
            this.setLoading(false);
        }
    };

    setFirebaseError = (typedError: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        crashlytics().log(`state: LoginState, method: setFirebaseError -> error: ${typedError}`);
        if (typedError.code in firebaseErrors) {
            this.setError(firebaseErrors[typedError.code]);
        } else {
            this.setError(typedError.message);
        }
    };

    onEmailSigninButtonPress = async (email: string, password: string) => {
        crashlytics().log(`state: LoginState, method: onEmailSigninButtonPress -> email: ${email}`);
        try {
            let credential = auth.EmailAuthProvider.credential(email, password);
            const { user } = await auth().signInWithCredential(credential);
            console.log('USER ', user);
            // this.verifyNewUser(user);
        } catch (error) {
            crashlytics().log(`state: LoginState, method: onEmailSigninButtonPress -> error: ${error}`);
            const typedError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
            this.setFirebaseError(typedError);
        }
    };

    public setEmail = (email: string) => {
        this.email = email;
    };

    public setPassword = (password: string) => {
        this.password = password;
    };

    // addUserToDatabase = async (userData: UserDataType) => {
    //     crashlytics().log(`state: LoginState, method: addUserToDatabase -> userData: ${JSON.stringify(userData)}`);
    //     const response = await createUser({
    //         name: userData.name,
    //         surname: userData.surname,
    //         date_of_birth: userData.date_of_birth,
    //         gender: userData.gender,
    //         postcode: userData.postcode,
    //         email: userData.email,
    //         google_id: userData.google_id ?? null,
    //         facebook_id: userData.facebook_id ?? null,
    //         apple_id: userData.apple_id ?? null,
    //         firebase_id: userData.firebase_id ?? null,
    //     });
    //     if (response.type === 'error') {
    //         this.setError(response.message);
    //     }
    // };
}
