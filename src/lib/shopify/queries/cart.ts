import { gql } from "@apollo/client/core";

export const GET_CART = gql`
  query Cart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            attributes { key value }
            merchandise {
              id
              title
              selectedOptions { name value }
            }
            cost {
              totalAmount { amount currencyCode }
            }
          }
        }
        pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
      }
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
        totalTaxAmount { amount currencyCode }
      }
    }
  }
`;
