import {GraphQLError} from 'graphql';
import {User, userModel} from '../../../../models';
import {CreateUserArgs} from '../types';
import {logger} from '../../../../logger';
import {Server} from '../../../../server';
import axios, {AxiosError} from 'axios';

export const createUser = async (
  _: User | undefined,
  args: CreateUserArgs
): Promise<User> => {
  try {
    const response = await axios.post<{user: User}>(
      `${Server.serverURL}:${Server.port}/auth/signup`,
      {
        name: args.name,
        password: args.password,
      }
    );

    const {user} = response.data;
    return user;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      logger.error(`Error When Signing Up User: ${error.response.data}`);
      throw new GraphQLError(`Failed to Sign Up User... `, {
        extensions: {
          code: 'BAD_USER_INPUT',
          http: {status: 400},
          data: error.response.data,
        },
      });
    }
    logger.error(`Error When Signing Up User: ${error}`);
    throw new GraphQLError('Failed To Sign Up User...', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {status: 500},
      },
    });
  }
};
