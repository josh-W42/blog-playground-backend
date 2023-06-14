import {GraphQLError} from 'graphql';
import {User, userModel} from '../../../../models';
import {logger} from '../../../../logger';
import {LoginUserArgs} from '../types';
import axios, {AxiosError} from 'axios';
import {Server} from '../../../../server';

export const loginUser = async (_: User | undefined, args: LoginUserArgs) => {
  try {
    const response = await axios.post(
      `${Server.serverURL}:${Server.port}/auth/login`,
      {
        name: args.name,
        password: args.password,
      }
    );

    logger.info('Login Successful');
    return true;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      logger.error('Error When Logging In User: ', error.response.data);
      throw new GraphQLError(`Failed to Login User... `, {
        extensions: {
          code: 'BAD_USER_INPUT',
          http: {status: 400},
          data: error.response.data,
        },
      });
    }
    logger.error('Error When Logging In User: ', error);
    throw new GraphQLError('Failed To Login User...', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {status: 500},
      },
    });
  }
};
