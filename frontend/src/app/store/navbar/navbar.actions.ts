import { createAction, props } from '@ngrx/store';
import { SelectItem } from '../../navbar';

// ShowNavbar
export const showNavbarEnable = createAction('showNavbarEnable');
export const showNavbarDisable = createAction('showNavbarDisable');

// IsLogin
export const isLogin = createAction('isLogin');
export const isLogout = createAction('isLogout');

// SessionUser
export const setSessionUser = createAction(
  'setSessionUser',
  props<{ session: Record<string, any> }>()
);
export const resetSessionUser = createAction('reSetSessionUser');

// SessionItem
export const setSelectItem = createAction(
  'setSelectItem',
  props<{ session: SelectItem[] }>()
);
export const resetSelectItem = createAction('resetSelectItem');
