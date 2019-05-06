import { Action } from "@ngrx/store";
import { User } from "../../models";

export enum ActionTypes {
  SIGNIN_REQUEST = "[AUTH] Signin Request",
  SIGNIN_FAILURE = "[AUTH] Signin Failure",
  SIGNIN_SUCCESS = "[AUTH] Signin Success",
  VALIDATE_TOKEN_REQUEST = "[AUTH] Validate Token Request",
  VALIDATE_TOKEN_FAILURE = "[AUTH] Validate Token Failure",
  VALIDATE_TOKEN_SUCCESS = "[AUTH] Validate Token Success"
}

export class SigninRequestAction implements Action {
  readonly type = ActionTypes.SIGNIN_REQUEST;
  constructor(public payload: { login: string; password: string }) {}
}

export class SigninFailureAction implements Action {
  readonly type = ActionTypes.SIGNIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class SigninSuccessAction implements Action {
  readonly type = ActionTypes.SIGNIN_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export class ValidateTokenRequestAction implements Action {
  readonly type = ActionTypes.VALIDATE_TOKEN_REQUEST;
  constructor() {}
}

export class ValidateTokenFailureAction implements Action {
  readonly type = ActionTypes.VALIDATE_TOKEN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class ValidateTokenSuccessAction implements Action {
  readonly type = ActionTypes.VALIDATE_TOKEN_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export type Actions =
  | SigninRequestAction
  | SigninFailureAction
  | SigninSuccessAction
  | ValidateTokenRequestAction
  | ValidateTokenSuccessAction
  | ValidateTokenFailureAction;
