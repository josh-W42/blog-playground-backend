import {getUsers, loginUser} from './queries';
import {createUser, deleteUserSoft, deleteUserHard} from './mutations';

export const userResolver = {
  Query: {
    getUsers,
    loginUser,
  },

  Mutation: {
    createUser,
    deleteUserSoft,
    deleteUserHard,
  },
};
