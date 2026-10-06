import { type } from "arktype";

export const envSchema = type({
  "PUBLIC_SHOPIFY_STORE_DOMAIN": "string",
  "PUBLIC_SHOPIFY_STOREFRONT_API_VERSION": "string",
  "SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN": "string",
  "PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?": "string | ''",
  "SHOPIFY_WEBHOOK_SECRET": "string",
  "CLOUDFLARE_ZONE_ID?": "string | ''",
  "CLOUDFLARE_CACHE_PURGE_API_TOKEN?": "string | ''",
  "REVALIDATE_SECRET?": "string | ''",
});

export type Env = typeof envSchema.infer;

export function validateEnv(env: Record<string, unknown>) {
  const result = envSchema(env);
  if (result instanceof TypeError) {
    const missing: string[] = [];
    const issues = (result as any).issues || [];
    for (const issue of issues) {
      const path = issue.path ? `.${issue.path.join(".")}` : "";
      missing.push(`${issue.message.replace("expected ", "")}${path}`);
    }
    throw new Error(
      `Environment validation failed:\n${missing.map((m) => `  - ${m}`).join("\n")}`,
    );
  }
  return result as Env;
}

export const env = (typeof globalThis !== "undefined" && (globalThis as any).env) || {};
