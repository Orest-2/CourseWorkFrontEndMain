import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as authActions from './actions';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';


@Injectable()
export class AuthStoreEffects {

  constructor(
    private dataService: AngularTokenService,
    private router: Router,
    private actions$: Actions
  ) { }

  @Effect()
  signinRequestEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType<authActions.SigninRequestAction>(
        authActions.ActionTypes.SIGNIN_REQUEST
      ),
      switchMap(action =>
        this.dataService
          .signIn({ login: action.payload.login, password: action.payload.password })
          .pipe(
            map(
              user => new authActions.SigninSuccessAction({ user: user.body })
            ),
            catchError(
              error => observableOf(new authActions.SigninFailureAction({ error: error.error }))
            )
          )
      )
    );

  @Effect({ dispatch: false })
  signinRequestSuccessEffect$ = this.actions$
    .pipe(
      ofType<authActions.SigninSuccessAction>(
        authActions.ActionTypes.SIGNIN_SUCCESS
      ),
      tap(() => {
        this.router.navigateByUrl('dashboard');
      })
    );

  @Effect()
  vlidateTokenRequestEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType<authActions.ValidateTokenRequestAction>(
        authActions.ActionTypes.VALIDATE_TOKEN_REQUEST
      ),
      switchMap(() =>
        this.dataService
          .validateToken()
          .pipe(
            map(
              user => new authActions.ValidateTokenSuccessAction({ user })
            ),
            catchError(
              error => observableOf(new authActions.ValidateTokenFailureAction({ error: error.error }))
            )
          )
      )
    );

  @Effect({ dispatch: false })
  vlidateTokenRequesFailuretEffect$ = this.actions$
    .pipe(
      ofType<authActions.ValidateTokenFailureAction>(
        authActions.ActionTypes.VALIDATE_TOKEN_FAILURE
      ),
      tap(() => {
        localStorage.clear();
        this.router.navigateByUrl('auth/signin');
      })
    );

}
