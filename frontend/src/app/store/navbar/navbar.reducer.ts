import { createReducer, on } from '@ngrx/store';
import {
  showNavbarEnable,
  showNavbarDisable,
  isLogin,
  isLogout,
  setSessionUser,
  resetSessionUser,
  setSelectItem,
  resetSelectItem,
} from './navbar.actions';

const token = localStorage.getItem('token');
const showNavbarInit = true;
const isLoginInit = token != null ? true : false;
const sessionUserInit = null;
const selectItemInit = [];

export const showNavbarReducer = createReducer(
  showNavbarInit,
  on(showNavbarEnable, (_) => true),
  on(showNavbarDisable, (_) => false)
);

export const isLoginReducer = createReducer(
  isLoginInit,
  on(isLogin, (_) => true),
  on(isLogout, (_) => false)
);

export const sessionUserReducer = createReducer(
  sessionUserInit,
  on(setSessionUser, (_, { session }) => session),
  on(resetSessionUser, (_) => sessionUserInit)
);

export const selectItemReducer = createReducer(
  selectItemInit,
  on(setSelectItem, (_, { session }) => session),
  on(resetSelectItem, (_) => selectItemInit)
);
