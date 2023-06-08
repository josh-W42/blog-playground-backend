import {gql} from 'graphql-tag';

// Note that any changes made to queries must also be reflected in resolvers.

export const querySchema = gql`
  #graphql

  type Query {
    """
    Retrieves every created user.
    """
    getUsers: [User]
  }

  type Mutation {
    """
    Creates a user with a given name.
    """
    createUser(name: String): User
    """
    Deletes a user that has the given ID.
    """
    deleteUser(id: ID): User
  }
`;
