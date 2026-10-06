# Shopify Webhook Setup

This file documents the required steps to configure Shopify webhooks for cache invalidation.

## Callback URL

```
POST https://<your-worker-domain>/api/webhooks/shopify
```

## Required Topics

- `products/update`
- `products/delete`
- `collections/update`
- `collections/delete`

## Required Shopify Scopes

- `read_products`
- `read_product_listings`
- `read_collections`
- `read_shopify_payments_disputes`
- `write_products`
- `write_collections`

## Sample Admin API Subscription

```graphql
mutation CreateWebhook {
  webhookSubscriptionCreate(
    topic: PRODUCTS_UPDATE
    format: JSON
    webhookSubscription: {
      callbackUrl: "https://<your-worker-domain>/api/webhooks/shopify"
    }
  ) {
    userErrors { field message }
    webhookSubscription { id }
  }
}
```

## Tag Mapping

| Topic | Tags |
| --- | --- |
| `products/update` | `shopify:product:<id>` |
| `products/delete` | `shopify:product:<id>` |
| `collections/update` | `shopify:collection:<id>` |
| `collections/delete` | `shopify:collection:<id>` |

## Retry Expectations

Shopify retries webhook deliveries with exponential backoff for up to 18 hours.
The handler is idempotent and validates HMAC signatures on every attempt.
