import { gql } from "@apollo/client/core";

export const CREATE_CART = gql`
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise { id title selectedOptions { name value } }
              cost { totalAmount { amount currencyCode } }
            }
          }
          pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise { id title selectedOptions { name value } }
              cost { totalAmount { amount currencyCode } }
            }
          }
          pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost { totalAmount { amount currencyCode } }
            }
          }
          pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
        }
        cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
      }
      userErrors { field message }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise { id title selectedOptions { name value } }
              cost { totalAmount { amount currencyCode } }
            }
          }
          pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;
