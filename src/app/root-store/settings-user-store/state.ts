import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";
import { User } from "src/app/models";

export const settingUserAdapter: EntityAdapter<User> = createEntityAdapter<
  User
>({
  selectId: model => model.id
});

export interface State extends EntityState<User> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = settingUserAdapter.getInitialState({
  isLoading: false,
  error: null
});
