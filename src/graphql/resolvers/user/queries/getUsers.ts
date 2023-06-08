import {GraphQLError} from 'graphql';
import {userDB} from '../../../../models';

export const getUsers = async () => {
  try {
    const users = await userDB.find();
    return users;
  } catch (error) {
    console.error('Error When Fetching All Users: ', error);
    throw new GraphQLError('Failed to Fetch All Users...', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};
