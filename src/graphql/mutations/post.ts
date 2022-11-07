import { gql } from 'graphql-request';

export const GQL_MUTATION_UPDATE_POST = gql`
  mutation UPDATE_POST($title: String, $content: String, $id: ID!) {
  updatePost(id: $id, data: { title: $title, content: $content}) {
    data {
      id
      attributes {
        title
        content
      }
    }
  }
}
`;
