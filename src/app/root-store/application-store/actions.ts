import { Action } from "@ngrx/store";
import { Application } from "src/app/models";

export enum ActionType {
  LOAD_REQUEST = "[APPLICATION] Load Request",
  LOAD_FAILURE = "[APPLICATION] Load Failure",
  LOAD_SUCCESS = "[APPLICATION] Load Success",
  CREATE_REQUEST = "[APPLICATION] Create Request",
  UPDATE_REQUEST = "[APPLICATION] Update Request",
  DELETE_REQUEST = "[APPLICATION] Delete Request",
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
  constructor(public payload: { applications: Application[] }) {}
}

export class CreateRequestAction implements Action {
  readonly type = ActionType.CREATE_REQUEST;
  constructor(public application: Application) {}
}

export class UpdateRequestAction implements Action {
  readonly type = ActionType.UPDATE_REQUEST;
  constructor(public id: number, public changes: Partial<Application>) {}
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
  | DeleteRequestAction
  | UpdateRequestAction;
