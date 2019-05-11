import { Action } from "@ngrx/store";
import { Product } from "src/app/models";

export enum ActionType {
  LOAD_REQUEST = "[PRODUCT] Load Request",
  LOAD_FAILURE = "[PRODUCT] Load Failure",
  LOAD_SUCCESS = "[PRODUCT] Load Success",
  CREATE_REQUEST = "[PRODUCT] Create Product",
  UPDATE_REQUEST = "[PRODUCT] Update Product",
  DELETE_REQUEST = "[PRODUCT] Delete Product"
}

export class LoadRequestAction implements Action {
  readonly type = ActionType.LOAD_REQUEST;
}

export class LoadFailureAction implements Action {
  readonly type = ActionType.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionType.LOAD_SUCCESS;
  constructor(public payload: { products: Product[] }) {}
}

export class CreateRequestAction implements Action {
  readonly type = ActionType.CREATE_REQUEST;
  constructor(public product: Product) {}
}

export class UpdateRequestAction implements Action {
  readonly type = ActionType.UPDATE_REQUEST;
  constructor(public id: string, public changes: Partial<Product>) {}
}

export class DeleteRequestAction implements Action {
  readonly type = ActionType.DELETE_REQUEST;
  constructor(public id: number) {}
}

export type Action =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | CreateRequestAction
  | UpdateRequestAction
  | DeleteRequestAction;
