import {GraphQLError} from 'graphql';
import {User, userDB} from '../../../../models';
import {DeleteUserArgs} from '../types';
import {logger} from '../../../../logger';

export const deleteUserSoft = async (
  _: User | undefined,
  args: DeleteUserArgs
): Promise<User> => {
  if (!args.id) {
    throw new GraphQLError("Missing required field 'id'", {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  try {
    const user = await userDB.findById(args.id);

    if (!user) {
      throw new GraphQLError('User Not Found...', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      });
    }

    await user.updateOne({
      deleted: true,
      name: 'DELETED',
      description: 'USER DELETED',
      profilePictureURL:
        'https://res.cloudinary.com/dom5vocai/image/upload/v1615610157/profile-image-placeholder_sbz3vl.png',
      originalName: user.name,
      originalDescription: user.description,
      originalProfilePictureURL: user.profilePictureURL,
    });

    logger.info(`Soft Deletion of User: ${user.name} Successful`);
    return user.toJSON();
  } catch (error) {
    logger.error('Error When Soft Deleting User: ', error);
    throw new GraphQLError('Failed to Delete User...', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};
