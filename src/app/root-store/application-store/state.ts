import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";
import { Application } from "src/app/models";

export const applicationAdapter: EntityAdapter<
  Application
> = createEntityAdapter<Application>({
  selectId: model => model.id
});

export interface State extends EntityState<Application> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = applicationAdapter.getInitialState({
  isLoading: false,
  error: null
});
