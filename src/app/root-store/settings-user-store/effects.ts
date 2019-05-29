import { Injectable } from "@angular/core";
import { SettingUserManagementService } from "src/app/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of as observableOf } from "rxjs";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError } from "rxjs/operators";
import * as settingUserActions from "./actions";

@Injectable()
export class SettingsUserStoreEffects {
  constructor(
    private productService: SettingUserManagementService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<settingUserActions.LoadRequestAction>(
      settingUserActions.ActionType.LOAD_REQUEST
    ),
    switchMap(() =>
      this.productService.getAll().pipe(
        map(
          data =>
            new settingUserActions.LoadSuccessAction({
              users: data.executor.concat(data.secretaries)
            })
        ),
        catchError(error =>
          observableOf(new settingUserActions.LoadFailureAction({ error }))
        )
      )
    )
  );
}
