export interface IUserLoginRequest {
  username: string;
  password: string;
}

export interface IUserLoginResponse {
  id: number;
  username: string;
  email: string;
  name: string;
  surname: string;
  displayName: string;
  company: string;
  mobile: string;
  title: string;
  managerDisplayName: string;
  unitName: string;
  profilePic?: any;
}

export interface ResponseBase<T> {
  success: boolean;
  data: T;
}
