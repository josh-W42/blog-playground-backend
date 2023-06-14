import {GraphQLError} from 'graphql';
import {userModel} from '../../../../models';
import {logger} from '../../../../logger';

export const getUsers = async () => {
  try {
    const users = await userModel.find();
    logger.info('Successfully Retrieved All Users');
    return users;
  } catch (error) {
    logger.error('Error When Fetching All Users: ', error);
    throw new GraphQLError('Failed to Fetch All Users...', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {status: 500},
      },
    });
  }
};
