import { GenericResponseType } from '@src/utils/commonGuards';
import crashlytics from '@react-native-firebase/crashlytics';
import { makePostRequest } from '../makeRequest';
import { isEventCreate, EventCreateType } from './eventsTypes';

export const createEvent = async (data: EventCreateType, token?: string): Promise<GenericResponseType> => {
    crashlytics().log(`API CALL: '/api/meetEvents - data: ${JSON.stringify(data)}`);
    if (isEventCreate(data)) {
        const response = await makePostRequest('/api/meetEvents', data, undefined, token);
        return response;
    }
    crashlytics().log("API CALL: '/api/meetEvents - Decode Error!");
    return {
        type: 'error',
        message: 'Decode error',
    };
};
