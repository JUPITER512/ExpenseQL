import { gql } from "@apollo/client";
export const GET_TRANSACTIONS = gql`
  query GetTransactions {
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
`;

export const GET_TRANSACTION_ID = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      userId
      paymentType
      location
      description
      date
      category
      amount
      _id
    }
  }
`;
