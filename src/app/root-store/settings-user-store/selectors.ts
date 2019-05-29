import { State, settingUserAdapter } from "./state";
import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import { User } from "src/app/models";

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectSettingUserState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("settingsUser");

export const selectAllUserItems = settingUserAdapter.getSelectors(
  selectSettingUserState
).selectAll;

export const selectUserById = (id: number) =>
  createSelector(
    selectAllUserItems,
    (allUsers: User[]) => {
      if (allUsers) {
        return allUsers.find(p => p.id === id);
      } else {
        return null;
      }
    }
  );

export const selectSettingUserError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectSettingUserState,
  getError
);

export const selectSettingUserIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectSettingUserState,
  getIsLoading
);
