import { createSelector, MemoizedSelector } from "@ngrx/store";
import { AuthStoreSelectors } from "./auth-store";
import { ProductStoreSelectors } from "./product-store";

export const selectError: MemoizedSelector<object, string> = createSelector(
  AuthStoreSelectors.selectSigninError,
  ProductStoreSelectors.selectProductError,
  (authError: string, productError: string) => {
    return authError || productError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  AuthStoreSelectors.selectSigninIsLoading,
  ProductStoreSelectors.selectProductIsLoading,
  (authIsLoading: boolean, productIsLoading) => {
    return authIsLoading || productIsLoading;
  }
);
