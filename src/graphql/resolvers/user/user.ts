import { GraphQLError } from "graphql";
import { User } from "../../../models";
import { CreateUserArgs } from "./types";

export const userResolver = {
  Query: {
    getUsers: () => {
      console.log(users);
      return users;
    },
  },

  Mutation: {
    createUser: (_: User | undefined, args: CreateUserArgs ): User => {

      if (!args.name) {
        throw new GraphQLError("Missing required field 'name'", {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const newUser: User = {
        id: String(Math.floor(Math.random() * 1000)),
        name: args.name,
        description: '',
        followers: [],
        following: [],
        posts: [],
        comments: [],
        createdAt: new Date(),
      }

      users.push(newUser);
      return newUser;
    },
  },
};

const users: User[] = [];
