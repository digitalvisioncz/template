function documentEventHandler(handler2) {
  if (typeof handler2 !== "function")
    throw new TypeError("`handler` must be a function");
  return handler2;
}
const WATCH_TAXONOMY_TYPES = /* @__PURE__ */ new Set(["complication", "caseMaterial", "strapMaterial"]);
const normalizeCacheTag = (tag) => tag.trim().replace(/\s+/g, "-").replace(/,/g, "").replace(/[^\x21-\x7e]/g, "");
const typeTag = (type) => `sanity:type:${type}`;
const documentTag = (type, id) => `sanity:${type}:${id}`;
function getCacheTagsForDocument(document) {
  const tags = /* @__PURE__ */ new Set([typeTag(document._type)]);
  if (document._type === "watch") {
    tags.add(documentTag("watch", document._id));
    const collectionId = document.collectionId ?? document.collection?._ref;
    if (collectionId) {
      tags.add(documentTag("collection", collectionId));
    }
  }
  if (document._type === "collection") {
    tags.add(documentTag("collection", document._id));
  }
  if (WATCH_TAXONOMY_TYPES.has(document._type)) {
    tags.add(typeTag("watch"));
  }
  return Array.from(tags).map(normalizeCacheTag).filter(Boolean);
}
async function purgeCloudflareCache(tags) {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!zoneId) {
    throw new Error("Missing CLOUDFLARE_ZONE_ID environment variable.");
  }
  if (!apiToken) {
    throw new Error("Missing CLOUDFLARE_API_TOKEN environment variable.");
  }
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tags })
    }
  );
  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.success === false) {
    const messages = payload?.errors?.map((error) => error.message).filter((message) => Boolean(message));
    throw new Error(
      `Cloudflare purge failed with status ${response.status}${messages?.length ? `: ${messages.join("; ")}` : ""}`
    );
  }
}
const handler = documentEventHandler(async ({ context, event }) => {
  const tags = getCacheTagsForDocument(event.data);
  if (tags.length === 0) {
    console.log("No Cloudflare cache tags derived from Sanity event.");
    return;
  }
  if (context.local || process.env.CLOUDFLARE_PURGE_DRY_RUN === "true") {
    console.log(`Dry run: would purge Cloudflare cache tags ${tags.join(",")}`);
    return;
  }
  await purgeCloudflareCache(tags);
  console.log(`Purged Cloudflare cache tags ${tags.join(",")}`);
});
export {
  getCacheTagsForDocument,
  handler
};
//# sourceMappingURL=index.js.map
