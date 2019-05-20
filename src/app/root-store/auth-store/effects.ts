import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as authActions from "./actions";
import { AngularTokenService } from "angular-token";
import { Router } from "@angular/router";
import { User } from "src/app/models";

@Injectable()
export class AuthStoreEffects {
  constructor(
    private dataService: AngularTokenService,
    private router: Router,
    private actions$: Actions
  ) {}

  @Effect()
  signinRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.SigninRequestAction>(
      authActions.ActionTypes.SIGNIN_REQUEST
    ),
    switchMap(action =>
      this.dataService
        .signIn({
          login: action.payload.login,
          password: action.payload.password
        })
        .pipe(
          map(
            res =>
              new authActions.SigninSuccessAction({
                user: this.modifyUser(res.body.data)
              })
          ),
          catchError(error =>
            observableOf(
              new authActions.SigninFailureAction({ error: error.error })
            )
          )
        )
    )
  );

  @Effect()
  signupRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.SignupRequestAction>(
      authActions.ActionTypes.SIGNUP_REQUEST
    ),
    switchMap(action =>
      this.dataService
        .registerAccount({
          login: action.payload.login,
          password: action.payload.password,
          passwordConfirmation: action.payload.confirmationPassword
        })
        .pipe(
          map(
            res =>
              new authActions.SignupSuccessAction({
                user: this.modifyUser(res.body.data)
              })
          ),
          catchError(error =>
            observableOf(
              new authActions.SignupFailureAction({ error: error.error })
            )
          )
        )
    )
  );

  @Effect({ dispatch: false })
  signinRequestSuccessEffect$ = this.actions$.pipe(
    ofType<authActions.SigninSuccessAction>(
      authActions.ActionTypes.SIGNIN_SUCCESS
    ),
    tap(() => {
      this.router.navigateByUrl("dashboard");
    })
  );

  @Effect({ dispatch: false })
  signupRequestSuccessEffect$ = this.actions$.pipe(
    ofType<authActions.SignupSuccessAction>(
      authActions.ActionTypes.SIGNUP_SUCCESS
    ),
    tap(() => {
      this.router.navigateByUrl("dashboard");
    })
  );

  @Effect()
  validateTokenRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.ValidateTokenRequestAction>(
      authActions.ActionTypes.VALIDATE_TOKEN_REQUEST
    ),
    switchMap(() =>
      this.dataService.validateToken().pipe(
        map(
          res =>
            new authActions.ValidateTokenSuccessAction({
              user: this.modifyUser(res.data)
            })
        ),
        catchError(error =>
          observableOf(
            new authActions.ValidateTokenFailureAction({ error: error.error })
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  validateTokenRequestFailureEffect$ = this.actions$.pipe(
    ofType<authActions.ValidateTokenFailureAction>(
      authActions.ActionTypes.VALIDATE_TOKEN_FAILURE
    ),
    tap(() => {
      localStorage.clear();
      this.router.navigateByUrl("auth/signin");
    })
  );

  modifyUser(user: User) {
    user.is_customer =
      !user.is_admin && !user.is_secretary && !user.is_executor;
    return user;
  }
}
