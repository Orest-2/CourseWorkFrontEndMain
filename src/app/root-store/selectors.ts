import { createSelector, MemoizedSelector } from "@ngrx/store";
import { AuthStoreSelectors } from "./auth-store";
import { ProductStoreSelectors } from "./product-store";
import { SettingsUserStoreSelectors } from "./settings-user-store";
import { ApplicationStoreSelectors } from "./application-store";

export const selectError: MemoizedSelector<object, string> = createSelector(
  AuthStoreSelectors.selectSigninError,
  ProductStoreSelectors.selectProductError,
  ApplicationStoreSelectors.selectApplicationError,
  SettingsUserStoreSelectors.selectSettingUserError,
  (
    authError: string,
    productError: string,
    applicationError: string,
    settingsUserError: string
  ) => {
    return authError || productError || applicationError || settingsUserError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  AuthStoreSelectors.selectSigninIsLoading,
  ProductStoreSelectors.selectProductIsLoading,
  ApplicationStoreSelectors.selectApplicationIsLoading,
  SettingsUserStoreSelectors.selectSettingUserIsLoading,
  (
    authIsLoading: boolean,
    productIsLoading: boolean,
    applicationIsLoading: boolean,
    settingsUserIsLoading: boolean
  ) => {
    return (
      authIsLoading ||
      productIsLoading ||
      applicationIsLoading ||
      settingsUserIsLoading
    );
  }
);
