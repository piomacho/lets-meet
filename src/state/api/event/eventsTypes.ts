import * as t from 'io-ts';
import { createGuard } from '@src/utils/createGuard';

export const EventCreateIO = t.interface({
    userId: t.string,
    title: t.string,
    category: t.string,
    gender: t.string,
    participants: t.number,
    latitude: t.union([t.string, t.null]),
    longitude: t.union([t.string, t.null]),
    place: t.union([t.string, t.null]),
    ageFrom: t.number,
    ageTo: t.number,
    description: t.union([t.string, t.null]),
    date: t.union([t.string, t.null]),
});
export const EventFetchIO = t.interface({
    gender: t.union([t.string, t.null]),
    category: t.union([t.string, t.null]),
});

export const isEventCreate = createGuard(EventCreateIO);
export type EventCreateType = t.TypeOf<typeof EventCreateIO>;

export const isEventsFetch = createGuard(EventFetchIO);
export type EventFetchType = t.TypeOf<typeof EventFetchIO>;

export const EventIO = t.interface({
    id: t.string,
    userId: t.string,
    title: t.string,
    category: t.string,
    gender: t.string,
    participants: t.number,
    latitude: t.union([t.string, t.null]),
    longitude: t.union([t.string, t.null]),
    place: t.union([t.string, t.null]),
    ageFrom: t.number,
    ageTo: t.number,
    description: t.union([t.string, t.null]),
    date: t.union([t.string, t.null]),
});

export const isEvent = createGuard(EventIO);
export type EventType = t.TypeOf<typeof EventIO>;
