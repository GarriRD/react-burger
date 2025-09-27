export type User = {
  name: string;
  email: string;
}


export type UserForm = Partial<User> & {
  password?: string;
}