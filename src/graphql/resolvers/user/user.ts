import { GraphQLError } from "graphql";
import { User, userDB } from "../../../models";
import { CreateUserArgs } from "./types";

export const userResolver = {
  Query: {
    getUsers: async () => {
      try {
        const users = await userDB.find();
        return users;
      } catch (error) {
        console.warn("Error When Fetching All Users: ", error);
        throw new GraphQLError("Failed to Fetch All Users...", {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          },
        });
      }
    },
  },

  Mutation: {
    createUser: async (_: User | undefined, args: CreateUserArgs ): Promise<User> => {

      if (!args.name) {
        throw new GraphQLError("Missing required field 'name'", {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      try {
        const newUser = await userDB.create({ name: args.name, description: '', });
        return newUser.toJSON();
      } catch (error) {
        console.warn("Error when creating user: ", error);
        throw new GraphQLError("Failed to Create New User...", {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          },
        });
      }

    },
  },
};