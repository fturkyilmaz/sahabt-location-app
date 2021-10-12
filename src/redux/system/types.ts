import {
  HIDE_LOADER,
  LOGOUT,
  SET_LANGUAGE,
  SET_THEME,
  SET_USER,
  TOGGLE_LOADER,
} from './actionTypes';

export interface SystemStore {
  language: string;
  token: string;
  userInfo: any;
  loading: boolean;
  theme: string;
  isAuth: boolean;
}

interface ToggleLoaderAction {
  type: typeof TOGGLE_LOADER;
}

interface HideLoaderAction {
  type: typeof HIDE_LOADER;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface SetThemeAction {
  type: typeof SET_THEME;
  payload: boolean;
}

interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: string;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: any;
}

export type SystemActionTypes =
  | ToggleLoaderAction
  | HideLoaderAction
  | LogoutAction
  | SetThemeAction
  | SetLanguageAction
  | SetUserAction;
