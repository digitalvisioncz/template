import { gql } from "@apollo/client/core";

export const GET_MENU = gql`
  query Menu($handle: String!) {
    menu(handle: $handle) {
      id
      items {
        title
        url
      }
    }
  }
`;
