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
    Soft deletes a user with the given ID.
    Soft Deletion marks the user as a "DELETED USER" and can be restored in the future if desired.
    """
    deleteUserSoft(id: ID): User
    """
    Hard deletes a user with the given ID.
    Hard Deletion completely removes the user from the database. WARNING: A user's data cannot be recovered after this process.
    """
    deleteUserHard(id: ID): User
  }
`;
