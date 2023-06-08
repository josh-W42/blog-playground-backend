import {gql} from 'graphql-tag';

// Note that any changes to the user schema should also be reflected in the user model.

export const userSchema = gql`
  #graphql
  type User {
    """
    A unique identifier for users.
    """
    id: ID
    """
    The user's displayed name.
    """
    name: String
    """
    A short description typically displayed bellow a user's name.
    """
    description: String
    # followers: [User]
    # following: [User] 
    # posts: [Post]
    # comments: [Comment]
    """
    A boolean check if a user has been "deleted" but not removed from the Database.
    """
    deleted: Boolean
    """
    A URL to the user's profile picture.
    """
    profilePictureURL: String
    """
    In the event of account deletion, this was the original name.
    """
    originalName: String
    """
    In the event of account deletion, this will hold the original user description.
    """
    originalDescription: String
    """
    In the event of account deletion, this will hold the original profile picture.
    """
    originalProfilePictureURL: String
    """
    A String representing the time (milliseconds since epoch) when the user was created.
    """
    createdAt: String
    """
    A String representing the time (milliseconds since epoch) when the user was updated last.
    """
    updatedAt: String
  }
`;
