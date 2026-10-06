import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
} from "@apollo/client/core";
import { validateEnv } from "../utils/env";

export const SHOPIFY_STOREFRONT_API_VERSION = "2025-04";

export function getStorefrontApiUrl() {
  const domain = validateEnv(import.meta.env).PUBLIC_SHOPIFY_STORE_DOMAIN || "";
  return `https://${domain.replace(/^https?:\/\//, "")}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;
}

export function getPrivateToken() {
  return validateEnv(import.meta.env).SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN;
}

export function getPublicToken() {
  return validateEnv(import.meta.env).PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
}

export function createServerClient() {
  const token = getPrivateToken();
  if (!token) {
    throw new Error("Missing SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN");
  }

  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: getStorefrontApiUrl(),
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
    }),
    defaultOptions: {
      watchQuery: { errorPolicy: "all" },
      query: { errorPolicy: "all" },
      mutate: { errorPolicy: "all" },
    },
  });
}

export function createBrowserClient() {
  const publicToken = getPublicToken();
  if (!publicToken) return null;

  return new ApolloClient({
    ssrMode: false,
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "/api/graphql",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": publicToken,
      },
    }),
    defaultOptions: {
      watchQuery: { errorPolicy: "all" },
      query: { errorPolicy: "all" },
      mutate: { errorPolicy: "all" },
    },
  });
}

export async function shopifyQuery<TData, TVariables = {}>({
  query,
  variables,
  cache = "force-cache",
}: {
  query: ReturnType<typeof gql>;
  variables?: TVariables;
  cache?: RequestCache;
}): Promise<TData> {
  const client = createServerClient();
  try {
    const result = await client.query({
      query,
      variables,
      fetchPolicy: cache === "no-store" ? "no-cache" : "cache-first",
    });
    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors.map((e) => e.message).join("\n"));
    }
    return result.data as TData;
  } finally {
    client.stop();
  }
}

export async function shopifyMutate<TData, TVariables = {}>({
  mutation,
  variables,
}: {
  mutation: ReturnType<typeof gql>;
  variables?: TVariables;
}): Promise<TData> {
  const client = createServerClient();
  try {
    const result = await client.mutate({
      mutation,
      variables,
      fetchPolicy: "no-cache",
    });
    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors.map((e) => e.message).join("\n"));
    }
    return result.data as TData;
  } finally {
    client.stop();
  }
}
