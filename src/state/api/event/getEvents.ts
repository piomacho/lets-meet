import { isArray } from '@src/utils/commonGuards';
import { makePostRequest } from '../makeRequest';
import crashlytics from '@react-native-firebase/crashlytics';
import { isEventsFetch, isEvent, EventType, EventFetchType } from './eventsTypes';

export const getEvents = async (data: EventFetchType): Promise<Array<EventType>> => {
    crashlytics().log("API CALL: '/api/meetEvents/fetch");
    if (isEventsFetch(data)) {
        const response = await makePostRequest('/api/meetEvents/fetch', data, undefined, undefined);

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
        crashlytics().log("API CALL: '/api/meetEvents/fetch");
        return tempEvents;
    }
    crashlytics().log("API CALL: '/api/meetEvents/fetch - Decode Error!");
    return [];
};
