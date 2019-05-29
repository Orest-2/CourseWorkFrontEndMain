import { Action } from "@ngrx/store";
import { User } from "src/app/models";

export enum ActionType {
  LOAD_REQUEST = "[SETTING_USER] Load Request",
  LOAD_FAILURE = "[SETTING_USER] Load Failure",
  LOAD_SUCCESS = "[SETTING_USER] Load Success",
  CREATE_REQUEST = "[SETTING_USER] Create Request",
  DELETE_REQUEST = "[SETTING_USER] Delete Request"
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
  constructor(public payload: { users: User[] }) {}
}

export class CreateRequestAction implements Action {
  readonly type = ActionType.CREATE_REQUEST;
  constructor(public user: User) {}
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
  | DeleteRequestAction;
