import {gql} from "@apollo/client";
export const CREATE_TRANSACTION = gql`
  mutation Mutation($input: createTransactionInput!) {
    createTransaction(input: $input) {
      userId
      description
      paymentType
      category
      amount
      location
      date
      _id
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation Mutation($input: updateTransactionInput!) {
    updateTransaction(input: $input) {
      userId
      paymentType
      location
      description
      category
      date
      amount
      _id
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation Mutation($transactionId: ID!) {
    deleteTransaction(transactionID: $transactionId) {
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
