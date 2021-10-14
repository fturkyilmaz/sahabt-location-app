import {UserActionTypes, UserStore} from './types';
import {SET_USER_LOCATION} from './actionTypes';

const initialState: UserStore = {
  userLocation: [],
};

export function userReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case SET_USER_LOCATION:
      return {...state, userLocation: action.payload};

    default:
      return state;
  }
}
