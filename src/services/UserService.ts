import HttpRequest from '../utils/HttpRequest';
import ApiConfig from '../config/ApiConfig';
import {IUserLoginRequest, IUserLoginResponse, ResponseBase} from './types';

export async function signIn(
  request: IUserLoginRequest,
): Promise<ResponseBase<IUserLoginResponse>> {
  return HttpRequest.post(ApiConfig.prefixes.auth.login, request);
}
