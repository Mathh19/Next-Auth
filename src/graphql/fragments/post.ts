import { gql } from 'graphql-request';

export const GQL_FRAGMENT_POST = gql`
  fragment post on PostEntityResponseCollection {
  data {
    id
    attributes {
      title
      content
      user {
        data {
          id
          attributes {
            username
            email
          }
        }
      }
      createdAt
    }
  }
}
`;
