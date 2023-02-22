import { isArray } from '@src/utils/commonGuards';
import { makeGetRequest } from '../makeRequest';
import crashlytics from '@react-native-firebase/crashlytics';
import { isEvent, EventType } from './eventsTypes';

export const getEventItem = async (eventId: string): Promise<EventType | null> => {
    crashlytics().log(`API CALL: '/api/meetEvents/id`);
    const response = await makeGetRequest(`/api/meetEvents/${eventId}`);

    if (response.type === 'error') {
        return null;
    }

    if (isEvent(response.data)) {
        return response.data;
    }
    crashlytics().log(`API CALL: '/api/meetEvents/id`);

    return null;
};
