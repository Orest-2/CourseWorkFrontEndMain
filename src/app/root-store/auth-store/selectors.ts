import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import { User } from "../../models";
import { State } from "./state";

const getSignInError = (state: State): any => state.errorSignIn;
const getSignUpError = (state: State): any => state.errorSignUp;
const getUser = (state: State): any => state.user;
const getIsLoading = (state: State): boolean => state.isLoading;
const getIsTokenValid = (state: State): boolean => state.isTokenValid;

export const selectAuthState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("auth");

export const selectSigninError: MemoizedSelector<object, any> = createSelector(
  selectAuthState,
  getSignInError
);

export const selectSigninIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectAuthState,
  getIsLoading
);

export const selectSignupError: MemoizedSelector<object, any> = createSelector(
  selectAuthState,
  getSignUpError
);

export const selectSignupIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectAuthState,
  getIsLoading
);

export const selectSigninUser: MemoizedSelector<object, User> = createSelector(
  selectAuthState,
  getUser
);

export const selectValidateTokenIsTokenValid: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectAuthState,
  getIsTokenValid
);
