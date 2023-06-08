import {GraphQLError} from 'graphql';
import {User, userDB} from '../../../models';
import {CreateUserArgs, DeleteUserArgs} from './types';
import {getUsers} from './queries';
import {createUser, deleteUserSoft} from './mutations';

export const userResolver = {
  Query: {
    getUsers,
  },

  Mutation: {
    createUser,
    deleteUserSoft,
  },
};
