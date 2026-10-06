import { validateEnv, env } from "../../../lib/utils/env";
import { purgeByTags } from "../../../lib/utils/cache";

export const config = {
  runtime: "edge",
};

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const topic = request.headers.get("X-Shopify-Topic") || "";
    const signature = request.headers.get("X-Shopify-Hmac-SHA256") || "";

    const secret = env.SHOPIFY_WEBHOOK_SECRET;
    if (!secret) {
      return new Response("Missing webhook secret", { status: 500 });
    }

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    const expected = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(body),
    );
    const expectedHex = Array.from(new Uint8Array(expected))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (signature !== expectedHex) {
      return new Response("Invalid signature", { status: 401 });
    }

    let payload: any;
    try {
      payload = JSON.parse(body);
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const id =
      topic === "products/update" || topic === "products/delete"
        ? payload.id || payload.product_id
        : topic === "collections/update" || topic === "collections/delete"
          ? payload.id || payload.collection_id
          : null;

    const tags = mapTopicToTags(topic, id ? String(id) : null);

    if (tags.length > 0) {
      await purgeByTags(tags);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Webhook handler failed", { status: 500 });
  }
}

export const GET = () => new Response("OK", { status: 200 });
