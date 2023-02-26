import { makePostRequest } from './../state/api/makeRequest';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { isFindUserBody } from './getUserTypes';
import { GenericResponseType } from '@src/utils/commonGuards';

export const getUserByEmail = async (user: FirebaseAuthTypes.User, email: string): Promise<GenericResponseType> => {
    crashlytics().log(`method: getUserByEmail -> ${email}`);
    const token = await user?.getIdToken();

    if (
        isFindUserBody({
            email: email,
        })
    ) {
        return await makePostRequest('/api/users/email', { email: email }, undefined, token);
    }

    crashlytics().log("API CALL: '/api/users/email' - Decode Error!");
    return {
        type: 'error',
        message: 'Decode error',
    };
};
