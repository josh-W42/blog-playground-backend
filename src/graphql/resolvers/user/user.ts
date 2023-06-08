import {getUsers} from './queries';
import {createUser, deleteUserSoft, deleteUserHard} from './mutations';

export const userResolver = {
  Query: {
    getUsers,
  },

  Mutation: {
    createUser,
    deleteUserSoft,
    deleteUserHard,
  },
};
