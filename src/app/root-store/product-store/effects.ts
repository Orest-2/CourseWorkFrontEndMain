import { Injectable } from "@angular/core";
import { ProductService } from "src/app/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of as observableOf } from "rxjs";
import { Action } from "@ngrx/store";
import { startWith, switchMap, map, catchError } from "rxjs/operators";
import * as productActions from "./actions";

@Injectable()
export class ProductStoreEffects {
  constructor(
    private productService: ProductService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.LoadRequestAction>(
      productActions.ActionType.LOAD_REQUEST
    ),
    switchMap(() =>
      this.productService.getAll().pipe(
        map(
          data =>
            new productActions.LoadSuccessAction({ products: data.products })
        ),
        catchError(error =>
          observableOf(new productActions.LoadFailureAction({ error }))
        )
      )
    )
  );
}
