import { State, applicationAdapter } from "./state";
import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import { Application } from "src/app/models";

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectApplicationState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("application");

export const selectAllApplicationItems = applicationAdapter.getSelectors(
  selectApplicationState
).selectAll;

export const selectApplicationById = (id: number) =>
  createSelector(
    selectAllApplicationItems,
    (allApplications: Application[]) => {
      if (allApplications) {
        return allApplications.find(p => p.id === id);
      } else {
        return null;
      }
    }
  );

export const selectApplicationError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectApplicationState,
  getError
);

export const selectApplicationIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectApplicationState,
  getIsLoading
);
