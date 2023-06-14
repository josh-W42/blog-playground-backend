import {GraphQLError} from 'graphql';
import {User, userModel} from '../../../../models';
import {DeleteUserArgs} from '../types';
import {logger} from '../../../../logger';

export const deleteUserHard = async (
  _: User | undefined,
  args: DeleteUserArgs
): Promise<User> => {
  if (!args.id) {
    throw new GraphQLError("Missing required field 'id'", {
      extensions: {
        code: 'BAD_USER_INPUT',
        http: {status: 400},
      },
    });
  }

  try {
    const user = await userModel.findById(args.id);

    if (!user) {
      throw new GraphQLError('User Not Found...', {
        extensions: {
          code: 'BAD_USER_INPUT',
          http: {status: 400},
        },
      });
    }

    await user.deleteOne();
    const ogName = user.name === 'DELETED' ? user.originalName : user.name;
    logger.info(`Hard Deletion of User: ${ogName} Successful`);
    return user.toJSON();
  } catch (error) {
    logger.error('Error When Soft Deleting User: ', error);
    throw new GraphQLError(`Failed to Delete User... ${error}`, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {status: 500},
      },
    });
  }
};
