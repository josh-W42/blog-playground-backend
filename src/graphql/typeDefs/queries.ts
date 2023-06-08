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
    Soft deletes a user that has the given ID.
    Soft Deletion does not completely delete the resource but instead marks content related to user as "DELETED".
    """
    deleteUserSoft(id: ID): User
  }
`;
