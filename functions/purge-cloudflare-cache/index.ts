import {documentEventHandler} from '@sanity/functions';

interface PurgeDocument {
    _id: string;
    _type: string;
    collection?: {
        _ref?: string | null;
    } | null;
    collectionId?: string | null;
}

interface CloudflarePurgeResponse {
    success: boolean;
    errors?: Array<{message?: string}>;
    messages?: Array<{message?: string}>;
}

const WATCH_TAXONOMY_TYPES = new Set(['complication', 'caseMaterial', 'strapMaterial']);

const normalizeCacheTag = (tag: string) =>
    tag
        .trim()
        .replace(/\s+/g, '-')
        .replace(/,/g, '')
        .replace(/[^\x21-\x7e]/g, '');

const typeTag = (type: string) => `sanity:type:${type}`;
const documentTag = (type: string, id: string) => `sanity:${type}:${id}`;

export function getCacheTagsForDocument(document: PurgeDocument) {
    const tags = new Set<string>([typeTag(document._type)]);

    if (document._type === 'watch') {
        tags.add(documentTag('watch', document._id));

        const collectionId = document.collectionId ?? document.collection?._ref;

        if (collectionId) {
            tags.add(documentTag('collection', collectionId));
        }
    }

    if (document._type === 'collection') {
        tags.add(documentTag('collection', document._id));
    }

    if (WATCH_TAXONOMY_TYPES.has(document._type)) {
        tags.add(typeTag('watch'));
    }

    return Array.from(tags).map(normalizeCacheTag).filter(Boolean);
}

async function purgeCloudflareCache(tags: string[]) {
    const zoneId = process.env.CLOUDFLARE_ZONE_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!zoneId) {
        throw new Error('Missing CLOUDFLARE_ZONE_ID environment variable.');
    }

    if (!apiToken) {
        throw new Error('Missing CLOUDFLARE_API_TOKEN environment variable.');
    }

    const response = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tags}),
        },
    );

    const payload = (await response.json().catch(() => null)) as CloudflarePurgeResponse | null;

    if (!response.ok || payload?.success === false) {
        const messages = payload?.errors
            ?.map(error => error.message)
            .filter((message): message is string => Boolean(message));
        throw new Error(
            `Cloudflare purge failed with status ${response.status}${
                messages?.length ? `: ${messages.join('; ')}` : ''
            }`,
        );
    }
}

export const handler = documentEventHandler<PurgeDocument>(async ({context, event}) => {
    const tags = getCacheTagsForDocument(event.data);

    if (tags.length === 0) {
        console.log('No Cloudflare cache tags derived from Sanity event.');
        return;
    }

    if (context.local || process.env.CLOUDFLARE_PURGE_DRY_RUN === 'true') {
        console.log(`Dry run: would purge Cloudflare cache tags ${tags.join(',')}`);
        return;
    }

    await purgeCloudflareCache(tags);
    console.log(`Purged Cloudflare cache tags ${tags.join(',')}`);
});
