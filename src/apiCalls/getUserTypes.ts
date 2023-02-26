import { createGuard } from '@src/utils/createGuard';
import * as t from 'io-ts';

const FindUserBodyIO = t.interface({
    email: t.string,
});

export const isFindUserBody = createGuard(FindUserBodyIO);

export const UserItemCreationIO = t.interface({
    email: t.string,
    google_id: t.union([t.string, t.null]),
    apple_id: t.union([t.string, t.null]),
    firebase_id: t.union([t.string, t.null]),
});
export const isUserItemCreationResponse = createGuard(UserItemCreationIO);
export type UserType = t.TypeOf<typeof UserItemCreationIO>;
