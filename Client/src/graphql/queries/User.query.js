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
