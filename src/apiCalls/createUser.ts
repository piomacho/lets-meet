import { GenericResponseType } from 'src/utils/commonGuards';
import crashlytics from '@react-native-firebase/crashlytics';
import { makePostRequest } from '@src/state/api/makeRequest';
import { isUserItemCreationResponse, UserType } from './getUserTypes';

export const createUser = async (data: UserType): Promise<GenericResponseType> => {
    crashlytics().log(`API CALL: '/api/users' - data: ${JSON.stringify(data)}`);
    if (isUserItemCreationResponse(data)) {
        return await makePostRequest('/api/users', data);
    }
    crashlytics().log("API CALL: '/api/users' - Decode Error!");
    return {
        type: 'error',
        message: 'Decode error',
    };
};
