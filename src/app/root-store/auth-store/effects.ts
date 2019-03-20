import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf, defer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as authActions from './actions';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';

@Injectable()
export class AuthStoreEffects {

  constructor(
    private dataService: AngularTokenService,
    private actions$: Actions,
    private router: Router
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

  @Effect()
  init$ = defer(() => {
    if (this.dataService.currentAuthData) {
      this.dataService
        .validateToken()
        .pipe(
          map(
            user => new authActions.ValidateTokenSuccessAction({ user: user.body })
          ),
          catchError(
            error => observableOf(new authActions.ValidateTokenFailureAction({ error: error.error }))
          )
        );
    } else {
      this.router.navigateByUrl('auth/signin');
    }
  });

}
