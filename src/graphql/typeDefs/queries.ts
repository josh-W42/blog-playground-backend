import {gql} from 'graphql-tag';

// Note that any changes made to queries must also be reflected in resolvers.

export const querySchema = gql`
  #graphql

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String): User
    deleteUser(id: ID): User
  }
`;
