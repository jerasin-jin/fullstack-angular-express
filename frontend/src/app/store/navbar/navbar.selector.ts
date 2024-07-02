import { createSelector } from '@ngrx/store';
import { SelectItem } from '../../navbar';

export interface AppState {
  selectItem: SelectItem;
}

export const selectSelectItem = (state: AppState) => state.selectItem;

export const selectItemSelector = createSelector(
  selectSelectItem,
  (state: SelectItem) => state
);
