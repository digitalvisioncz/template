import { gql } from "@apollo/client/core";

export const GET_PRODUCTS = gql`
  query Products($first: Int, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          id
          handle
          title
          description
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          compareAtPriceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          featuredImage { id url altText width height }
          images(first: 20) {
            edges { node { id url altText width height } }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                selectedOptions { name value }
                image { id url altText width height }
              }
            }
          }
          tags
          vendor
          productType
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml(format: PLAIN_TEXT)
      options { id name values }
      priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
      compareAtPriceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
      featuredImage { id url altText width height }
      images(first: 20) {
        edges { node { id url altText width height } }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            selectedOptions { name value }
            image { id url altText width height }
          }
        }
      }
      tags
      vendor
      productType
    }
  }
`;
