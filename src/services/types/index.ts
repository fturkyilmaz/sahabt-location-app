export interface IUserLoginRequest {
  username: string;
  password: string;
}

export interface IUserLoginResponse {
  id: number;
  name: string;
  lastName: string;
  username: string;
  email: string;
  image?: any;
}

export interface IUserLocationResponse {
  id: number;
  time: Date;
  city: string;
  size: number;
  location: string;
  latitude: number;
  longitude: number;
  comments: string;
  created_at: Date;
  updated_at: Date;
  image: string;
}

export interface ResponseBase<T> {
  success: boolean;
  data: T;
}
