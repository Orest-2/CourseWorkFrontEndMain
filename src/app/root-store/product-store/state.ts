import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";
import { Product } from "src/app/models";

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<
  Product
>({
  selectId: model => model.id
});

export interface State extends EntityState<Product> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = productAdapter.getInitialState({
  isLoading: false,
  error: null
})
