import * as t from 'io-ts';
import { createGuard } from './createGuard';

const SuccessResponseIO = t.interface({
    type: t.literal('success'),
    data: t.unknown,
});

const ErrorResponseIO = t.interface({
    type: t.literal('error'),
    message: t.string,
});

export type SuccessResponseType = t.TypeOf<typeof SuccessResponseIO>;
export type ErrorResponseType = t.TypeOf<typeof ErrorResponseIO>;
export type GenericResponseType = SuccessResponseType | ErrorResponseType;

export const isGenericResponse = createGuard(t.union([SuccessResponseIO, ErrorResponseIO]));

export const isArray = createGuard(t.array(t.unknown));
export const isString = createGuard(t.string);
export const isNumber = createGuard(t.number);
