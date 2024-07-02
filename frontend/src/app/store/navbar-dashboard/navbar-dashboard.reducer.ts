import { createReducer, on } from '@ngrx/store';
import {
  showNavbarDashBoardEnable,
  showNavbarDashBoardDisable,
} from './navbar-dashboard.actions';

const initialState = false;

export const showNavbarDashBoardReducer = createReducer(
  initialState,
  on(showNavbarDashBoardEnable, (_) => true),
  on(showNavbarDashBoardDisable, (_) => false)
);
