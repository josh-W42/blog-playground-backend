import {gql} from 'graphql-tag';

export const exampleSchema = gql`
  #graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;
