import HttpRequest from '../utils/HttpRequest';
import ApiConfig from '../config/ApiConfig';
import {
  IUserLocationResponse,
  IUserLoginRequest,
  IUserLoginResponse,
  ResponseBase,
} from './types';

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

export async function saveUserLocation(
  request: IUserLocationResponse,
): Promise<IUserLocationResponse> {
  return HttpRequest.put(`${prefixes.userLocation}/${request.id}`, request);
}
