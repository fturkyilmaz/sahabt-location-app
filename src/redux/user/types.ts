import {IUserLocationResponse} from '../../services/types';
import {SET_USER_LOCATION} from './actionTypes';

export interface UserStore {
  userLocation: IUserLocationResponse[];
}

interface SetUserLocation {
  type: typeof SET_USER_LOCATION;
  payload: IUserLocationResponse;
}

export type UserActionTypes = SetUserLocation;
