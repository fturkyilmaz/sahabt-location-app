import HttpRequest from '../utils/HttpRequest';
import ApiConfig from '../config/ApiConfig';
import {IUserLoginRequest, IUserLoginResponse, ResponseBase} from './types';

const prefixes = ApiConfig?.prefixes;

export async function signIn(
  request: IUserLoginRequest,
): Promise<ResponseBase<IUserLoginResponse[]>> {
  return HttpRequest.get(prefixes.login, {
    params: {username: request?.username, password: request?.password},
  });
}

export async function getUserLocation(): Promise<any> {
  return HttpRequest.get(prefixes.userLocation);
}
