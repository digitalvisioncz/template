import { env } from "../../lib/utils/env";
import { purgeByTags } from "../../lib/utils/cache";

export const config = {
  runtime: "edge",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const secret = request.headers.get("x-revalidate-secret") || "";

    if (!env.REVALIDATE_SECRET || secret !== env.REVALIDATE_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }

    const tags: string[] = Array.isArray(body.tags)
      ? body.tags
      : body.tag
        ? [body.tag]
        : [];

    if (tags.length === 0) {
      return new Response("No tags provided", { status: 400 });
    }

    const purged = await purgeByTags(tags);
    return new Response(
      JSON.stringify({ purged, tags }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Revalidate error:", error);
    return new Response("Revalidation failed", { status: 500 });
  }
}

export const GET = () => new Response("OK", { status: 200 });
