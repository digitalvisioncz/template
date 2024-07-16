import {
    pipe,
    string,
    transform,
    optional,
} from 'valibot';

export const optionalNumberPipe = pipe(
    optional(
        string(),
    ),
    transform(value => {
        if (value === undefined) {
            return undefined;
        }

        const parsedValue = Number(value);

        if (Number.isNaN(parsedValue)) {
            return undefined;
        }

        return parsedValue;
    }),
);

export const optionalStringPipe = optional(
    string(),
);

export const optionalBooleanPipe = pipe(
    optional(
        string(),
    ),
    transform(value => {
        if (value === undefined) {
            return undefined;
        }

        return value === 'true';
    }),
);
