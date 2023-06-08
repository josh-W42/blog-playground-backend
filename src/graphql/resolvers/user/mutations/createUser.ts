import {GraphQLError} from 'graphql';
import {User, userDB} from '../../../../models';
import {CreateUserArgs} from '../types';
import {logger} from '../../../../logger';

export const createUser = async (
  _: User | undefined,
  args: CreateUserArgs
): Promise<User> => {
  if (!args.name) {
    throw new GraphQLError("Missing required field 'name'", {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  try {
    const newUser = await userDB.create({name: args.name, description: ''});
    logger.info(`New User: ${args.name} Created Successfully`);
    return newUser.toJSON();
  } catch (error) {
    logger.error('Error when creating user: ', error);
    throw new GraphQLError('Failed to Create New User...', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};
