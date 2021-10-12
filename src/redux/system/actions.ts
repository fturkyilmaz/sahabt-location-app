import {
  TOGGLE_LOADER,
  HIDE_LOADER,
  SET_LANGUAGE,
  SET_THEME,
  SET_USER,
  LOGOUT,
} from './actionTypes';

//Loader açar
export function toggleLoader() {
  return {type: TOGGLE_LOADER};
}

//Loader kapatır
export function hideLoader() {
  return {type: HIDE_LOADER};
}

//Sistemin temasını set eder.
export function setTheme(payload: string) {
  return {type: SET_THEME, payload};
}

//Sistemin dilini set eder.
export function setLanguage(payload: string) {
  return {type: SET_LANGUAGE, payload};
}

//Sisteme login olmuş kişiy set eder.
export function setUser(payload: any) {
  return {type: SET_USER, payload};
}

//Sistemden cıkıs yapmanızı sağlar.
export function logout() {
  return {
    type: LOGOUT,
  };
}
