import { gql, useQuery } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    auth {
      _id
      username
      profilePicture
      name
    }
  }
`;

export const GET_USER_AND_TRANSACTIONS = gql`
  query GetUserAndTransactions($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      profilePicture
      name
      transactions {
        _id
        description
        paymentType
        category
        amount
        location
        date
      }
    }
  }
`;
