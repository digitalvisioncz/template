import {sendEvent} from '@dvdevcz/kukiole-library';
import config from '../configs/app';

interface SendAnalyticsEventProps {
    name: string,
    value?: string,
    data?: {
        [key: string]: string | number | boolean,
    },
}

const options = {
    sourceId: config.analytics.sourceId,
    endpoint: config.analytics.endpoint,
};

const sendAnalyticsEvent = async ({
    name,
    value,
    data,
}: SendAnalyticsEventProps) => {
    const input = {
        eventName: name,
        eventValue: value,
        eventData: data,
    };

    await sendEvent({
        input,
        options,
    });
};

export default sendAnalyticsEvent;
