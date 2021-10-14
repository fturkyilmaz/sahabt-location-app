import {IUserLocationResponse} from '../../services/types';
import {SET_USER_LOCATION} from './actionTypes';

//Kullanıcı konumlarını setler.
export function setUserLocation(payload: IUserLocationResponse[]) {
  return {type: SET_USER_LOCATION, payload};
}
