import {SystemStore, SystemActionTypes} from './types';
import {
  SET_LANGUAGE,
  SET_USER,
  SET_THEME,
  HIDE_LOADER,
  LOGOUT,
  TOGGLE_LOADER,
} from './actionTypes';
import {IUserLoginResponse} from '../../services/types';

const initialState: SystemStore = {
  loading: false,
  userInfo: {} as IUserLoginResponse,
  token: '',
  language: 'en',
  theme: 'light',
  isAuth: false,
};

export function systemReducer(state = initialState, action: SystemActionTypes) {
  switch (action.type) {
    case LOGOUT:
      return {...state, userInfo: {}, token: '', loading: false, isAuth: false};

    case TOGGLE_LOADER:
      return {...state, loading: true};

    case HIDE_LOADER:
      return {...state, loading: false};

    case SET_THEME:
      return {...state, theme: action.payload};

    case SET_LANGUAGE:
      return {...state, language: action.payload};

    case SET_USER:
      return {...state, userInfo: action.payload, loading: false, isAuth: true};

    default:
      return state;
  }
}
