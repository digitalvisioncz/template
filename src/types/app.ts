export enum AppDataKeys {
    INSTANCE_ID = 'instanceId',
}

export interface AppData {
    [AppDataKeys.INSTANCE_ID]?: string,
}
