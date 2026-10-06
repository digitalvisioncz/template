import { gql } from "@apollo/client/core";

export const GET_COLLECTIONS = gql`
  query Collections($first: Int, $after: String) {
    collections(first: $first, after: $after) {
      edges {
        node {
          id
          handle
          title
          description
          image { id url altText width height }
          products(first: 12) {
            edges {
              node {
                id
                handle
                title
                featuredImage { id url altText width height }
                priceRange { minVariantPrice { amount currencyCode } }
              }
            }
          }
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

export const GET_COLLECTION = gql`
  query Collection($handle: String!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image { id url altText width height }
      products(first: 24) {
        edges {
          node {
            id
            handle
            title
            featuredImage { id url altText width height }
            priceRange { minVariantPrice { amount currencyCode } }
            compareAtPriceRange { minVariantPrice { amount currencyCode } }
            tags
            vendor
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;
