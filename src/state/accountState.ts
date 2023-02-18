import { makeAutoObservable } from 'mobx';
import crashlytics from '@react-native-firebase/crashlytics';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export class AccountState {
    firebaseUser: FirebaseAuthTypes.User | null = null;
    public email: string = '';
    public password: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    public setFirebaseUser = (user: FirebaseAuthTypes.User | null) => {
        crashlytics().log(`method: setFirebaseUser: ${user?.uid}`);
        this.firebaseUser = user;
        // this.usersResource.refresh();
    };

    logoutUser = async () => {
        crashlytics().log('method: logoutUser');
        try {
            await auth().signOut();
            this.setFirebaseUser(null);
            // this.usersResource.refresh();
        } catch (err) {
            const error = err as FirebaseAuthTypes.NativeFirebaseAuthError;
            console.error(error.message);
        }
    };
}
