import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation Mutation($input: SignUpInput!) {
    signUp(input: $input) {
      username
      name
      gender
      _id
    }
  }
`;
export const LOG_IN = gql`
  mutation Mutation($input: LoginInput!) {
    login(input: $input) {
      _id
      gender
      name
      profilePicture
      username
    }
  }
`;

export const LOG_OUT = gql`
  mutation Mutation {
    logout {
      message
    }
  }
`;
