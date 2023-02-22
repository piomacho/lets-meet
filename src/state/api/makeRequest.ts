import axios, { AxiosResponse } from 'axios';
import crashlytics from '@react-native-firebase/crashlytics';
import { GenericResponseType, isGenericResponse } from '@src/utils/commonGuards';

const getUrl = (endpointInner: string): string => {
    const backendUrl = 'http://localhost:5005/';
    const endpoint = endpointInner.startsWith('/') ? endpointInner.slice(1) : endpointInner;

    if (backendUrl === null) {
        throw Error('Backent url not found');
    }

    if (backendUrl.endsWith('/')) {
        return `${backendUrl}${endpoint}`;
    }

    return `${backendUrl}/${endpoint}`;
};

const makeRequest = async (
    request: () => Promise<AxiosResponse<unknown, any>>,
    url: string,
): Promise<GenericResponseType> => {
    try {
        const response = await request();

        if (isGenericResponse(response.data)) {
            return response.data;
        } else {
            console.error(`${url} - Can't decode`);
            crashlytics().log(`${url} - Can't decode`);
            return {
                type: 'error',
                message: `Can not decode - ${url}`,
            };
        }
    } catch (e) {
        if (typeof e === 'string') {
            console.error(`${url} - ${e.toUpperCase()}`);
            crashlytics().log(`makeRequest - ${url} - ${e.toUpperCase()}`);
            return {
                type: 'error',
                message: e.toUpperCase(),
            };
        } else if (e instanceof Error) {
            console.error(`${url} - ${e.message}`);
            crashlytics().log(`makeRequest - ${url} - ${e.message}`);
            return {
                type: 'error',
                message: e.message,
            };
        }
        console.error(`${url} - Unknown error`);
        crashlytics().log(`makeRequest - ${url} - Unknown error`);
        return {
            type: 'error',
            message: 'Unknown error',
        };
    }
};

export const makeGetRequest = async (endpoint: string, token?: string): Promise<GenericResponseType> => {
    const url = getUrl(endpoint);
    if (token === undefined) {
        return makeRequest(() => axios.get(url), url);
    }
    const config = {
        headers: {
            authorization: token,
        },
    };
    return makeRequest(() => axios.get(url, config), url);
};

export const makePostRequest = async (
    endpoint: string,
    data: unknown,
    config?: Record<string, Record<string, string>>,
    token?: string,
): Promise<GenericResponseType> => {
    const url = getUrl(endpoint);
    const innerConfig = config || {};
    if (token !== undefined) {
        innerConfig.headers = { authorization: token };
    }
    return makeRequest(() => axios.post(url, data, innerConfig), url);
};

export const makePutRequest = async (endpoint: string, data: unknown, token?: string): Promise<GenericResponseType> => {
    const url = getUrl(endpoint);
    const innerConfig: Record<string, Record<string, string>> = {};

    if (token !== undefined) {
        innerConfig.headers = { authorization: token };
    }
    return makeRequest(() => axios.put(url, data, innerConfig), url);
};

export const makeDeleteRequest = async (endpoint: string, token?: string): Promise<GenericResponseType> => {
    const url = getUrl(endpoint);
    const innerConfig: Record<string, Record<string, string>> = {};

    if (token !== undefined) {
        innerConfig.headers = { authorization: token };
    }
    return makeRequest(() => axios.delete(url, innerConfig), url);
};
