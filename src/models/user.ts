import mongoose, { Schema } from "mongoose";

export interface User {
  id: string,
  name: string,
  description: string,
  // followers: User[],
  // following: User[], 
  // posts: [],
  // comments: [],
  deleted: boolean,
  profilePictureURL: string,
  originalName: string,
  originalDescription: string,
  originalProfilePictureURL: string,
  createdAt: string,
  updatedAt: string,
}

const userSchema = new Schema({
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
    default: "https://res.cloudinary.com/dom5vocai/image/upload/v1615610157/profile-image-placeholder_sbz3vl.png"
  },
  originalName: {
    type: String,
    default: "",
  },
  originalDescription: {
    type: String,
    default: "",
  },
  originalProfilePictureURL: {
    type: String,
    default: "",
  },
}, { timestamps: true })

export const userDB = mongoose.model('User', userSchema);