import { State, productAdapter } from "./state";
import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import { Product } from "src/app/models";

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectProductState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("product");

export const selectAllProductItems = productAdapter.getSelectors(selectProductState).selectAll;

export const selectProductById = (id: number) =>
  createSelector(
    selectAllProductItems,
    (allProducts: Product[]) => {
      if (allProducts) {
        return allProducts.find(p => p.id === id);
      } else {
        return null;
      }
    }
  );

export const selectProductError: MemoizedSelector<object, any> = createSelector(
  selectProductState,
  getError
);

export const selectProductIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectProductState,
  getIsLoading
);
