import { isArray } from '@src/utils/commonGuards';
import { makeGetRequest } from '../makeRequest';
import crashlytics from '@react-native-firebase/crashlytics';
import { isEvent, EventType } from './eventsTypes';

export const getEvents = async (): Promise<Array<EventType>> => {
    crashlytics().log(`API CALL: '/api/meetEvents`);
    const response = await makeGetRequest(`/api/meetEvents`);

    if (response.type === 'error') {
        return [];
    }

    const tempEvents: Array<EventType> = [];

    if (isArray(response.data)) {
        for (const events of response.data) {
            if (isEvent(events)) {
                tempEvents.push(events);
            }
        }
    }
    crashlytics().log(`API CALL: '/api/meetEvents`);
    return tempEvents;
};
