import { Injectable } from "@angular/core";
import { ApplicationService } from "src/app/services/application.service";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of as observableOf } from "rxjs";
import * as applicationAction from "./actions";
import { startWith, switchMap, map, catchError } from "rxjs/operators";
import { Action } from './actions';

@Injectable()
export class ApplicationStoreEffects {
  constructor(
    private applicationService: ApplicationService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<applicationAction.LoadRequestAction>(
      applicationAction.ActionType.LOAD_REQUEST
    ),
    switchMap(() =>
      this.applicationService.getAll().pipe(
        map(
          data =>
            new applicationAction.LoadSuccessAction({
              applications: data.copyright_applications
            })
        ),
        catchError(error =>
          observableOf(new applicationAction.LoadFailureAction({ error }))
        )
      )
    )
  );
}
