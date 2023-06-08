import { GraphQLError } from "graphql";
import { User, userDB } from "../../../models";
import { CreateUserArgs, DeleteUserArgs } from "./types";

export const userResolver = {
  Query: {
    getUsers: async () => {
      try {
        const users = await userDB.find();
        return users;
      } catch (error) {
        console.error("Error When Fetching All Users: ", error);
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
        console.error("Error when creating user: ", error);
        throw new GraphQLError("Failed to Create New User...", {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          },
        });
      }
    },
    deleteUserSoft: async (_: User | undefined, args: DeleteUserArgs): Promise<User> => {
      if (!args.id) {
        throw new GraphQLError("Missing required field 'id'", {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      try {
        const user = await userDB.findById(args.id);

        if (!user) {
          throw new GraphQLError("User Not Found...", {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }

        await user.updateOne({
          deleted: true,
          name: "DELETED",
          description: "USER DELETED",
          profilePictureURL: "https://res.cloudinary.com/dom5vocai/image/upload/v1615610157/profile-image-placeholder_sbz3vl.png",
          originalName: user.name,
          originalDescription: user.description,
          originalProfilePictureURL: user.profilePictureURL, 
        });

        return user.toJSON();
      } catch (error) {
        console.error("Error When Soft Deleting User: ", error);
        throw new GraphQLError("Failed to Delete User...", {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          },
        });
      }
    },
  },
};