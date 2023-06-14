export interface CreateUserArgs {
  name: string;
  password: string;
}

export interface LoginUserArgs {
  name: string;
  password: string;
}

export interface DeleteUserArgs {
  id: String;
}
