import { validateEnv } from "./env";

export type Env = ReturnType<typeof validateEnv>;

export type CacheTag = string;
export type ResourceId = string;

export function productTag(id: string): CacheTag {
  return `shopify:product:${id}`;
}

export function collectionTag(id: string): CacheTag {
  return `shopify:collection:${id}`;
}

export function searchTag(): CacheTag {
  return "shopify:search";
}

export function mapTopicToTags(
  topic: string,
  id: string | null,
): CacheTag[] {
  switch (topic) {
    case "products/update":
    case "products/delete":
      return id ? [productTag(id)] : [];
    case "collections/update":
    case "collections/delete":
      return id ? [collectionTag(id)] : [];
    default:
      return [];
  }
}

export function cacheHeaders(tags: CacheTag[]) {
  return {
    "Cache-Control": "public, max-age=60, s-maxage=300",
    "CDN-Cache-Control": "max-age=300",
    ...(tags.length ? { "Cache-Tag": tags.join(", ") } : {}),
  };
}

export function noStoreHeaders() {
  return {
    "Cache-Control": "no-store, private",
  };
}

export async function purgeByTags(tags: CacheTag[]): Promise<boolean> {
  const e = validateEnv(import.meta.env);
  const zoneId = e.CLOUDFLARE_ZONE_ID;
  const token = e.CLOUDFLARE_CACHE_PURGE_API_TOKEN;
  if (!zoneId || !token || tags.length === 0) return false;

  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tags }),
    });
  } catch {
    return false;
  }

  return res.ok;
}
