import {GraphQLError} from 'graphql';
import {User, userDB} from '../../../../models';
import {DeleteUserArgs} from '../types';

export const deleteUserHard = async (
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

    await user.deleteOne();

    return user.toJSON();
  } catch (error) {
    console.error('Error When Soft Deleting User: ', error);
    throw new GraphQLError(`Failed to Delete User... ${error}`, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};
