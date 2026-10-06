import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import type { NormalizedCacheObject } from "@apollo/client";

export const cartIdVar = makeVar<string | null>(null);
export const isCartOpenVar = makeVar(false);

export function createBrowserClient(
  initialState?: NormalizedCacheObject,
) {
  const publicToken = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!publicToken) return null;

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cart: {
            read() {
              return cartIdVar() ?? null;
            },
          },
        },
      },
    },
  });

  if (initialState) {
    cache.restore(initialState);
  }

  return new ApolloClient({
    ssrMode: false,
    cache,
    uri: "/api/graphql",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": publicToken,
    },
    defaultOptions: {
      watchQuery: { errorPolicy: "all" },
      query: { errorPolicy: "all" },
      mutate: { errorPolicy: "all" },
    },
  });
}
