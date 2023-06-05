export interface User {
  id: string,
  name: string,
  description: string,
  followers: User[],
  following: User[], 
  posts: [],
  comments: [],
  createdAt: Date,
}