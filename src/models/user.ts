import mongoose, { Schema } from "mongoose";

export interface User {
  id: string,
  name: string,
  description: string,
  // followers: User[],
  // following: User[], 
  // posts: [],
  // comments: [],
  createdAt: string,
  updatedAt: string,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
}, { timestamps: true })

export const userDB = mongoose.model('User', userSchema);