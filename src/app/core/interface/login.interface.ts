export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  token: string;
  user: IUser;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}
