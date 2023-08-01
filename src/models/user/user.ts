import mongoose, {
  Document,
  PassportLocalDocument,
  PassportLocalModel,
  Schema,
} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface User extends PassportLocalDocument {
  id: string;
  name: string;
  password: string;
  description: string;
  // followers: User[],
  // following: User[],
  // posts: [],
  // comments: [],
  deleted: boolean;
  profilePictureURL: string;
  originalName: string;
  originalDescription: string;
  originalProfilePictureURL: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    profilePictureURL: {
      type: String,
      default:
        'https://res.cloudinary.com/dom5vocai/image/upload/v1615610157/profile-image-placeholder_sbz3vl.png',
    },
    originalName: {
      type: String,
      default: '',
    },
    originalDescription: {
      type: String,
      default: '',
    },
    originalProfilePictureURL: {
      type: String,
      default: '',
    },
  },
  {timestamps: true}
);

interface UserModel<T extends Document> extends PassportLocalModel<T> {}

userSchema.plugin(passportLocalMongoose, {usernameField: 'name'});

export const userModel: UserModel<User> = mongoose.model<User>(
  'User',
  userSchema
);
