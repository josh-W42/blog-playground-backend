import {gql} from 'graphql-tag';

// Note that any changes to the user schema should also be reflected in the user model.

export const userSchema = gql`
  #graphql
  type User {
    id: ID
    name: String
    description: String
    # followers: [User]
    # following: [User] 
    # posts: [Post]
    # comments: [Comment]
    # deleted
    createdAt: String
    updatedAt: String
  }
`;
