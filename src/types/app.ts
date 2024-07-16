import {
    object,
    InferOutput,
    InferInput,
} from 'valibot';
import {
    optionalBooleanPipe,
    optionalNumberPipe,
    optionalStringPipe,
} from '../helpers/validation/appData';

export enum AppDataKeys {
    instanceId = 'instanceId',
    instanceName = 'instanceName',
    instanceEmbeded = 'instanceEmbeded',
}

export const appDataSchema = object({
    [AppDataKeys.instanceId]: optionalNumberPipe,
    [AppDataKeys.instanceName]: optionalStringPipe,
    [AppDataKeys.instanceEmbeded]: optionalBooleanPipe,
});

export type AppRawData = InferInput<typeof appDataSchema>;

export type AppData = InferOutput<typeof appDataSchema>;
