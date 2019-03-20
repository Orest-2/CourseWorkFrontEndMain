import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthStoreSelectors } from './auth-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  AuthStoreSelectors.selectSigninError,
  (authError: string) => {
    return authError;
  }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  AuthStoreSelectors.selectSigninIsLoading,
  (authIsLogin: boolean) => {
    return authIsLogin;
  }
);
