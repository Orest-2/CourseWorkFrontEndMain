import { Action, ActionType } from "./actions";
import { initialState, State, settingUserAdapter } from "./state";

export function settingsUserReducer(
  state = initialState,
  action: Action
): State {
  switch (action.type) {
    case ActionType.LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case ActionType.LOAD_SUCCESS:
      return settingUserAdapter.addAll(action.payload.users, {
        ...state,
        isLoading: false,
        error: null
      });
    case ActionType.LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    case ActionType.CREATE_REQUEST:
      return settingUserAdapter.addOne(action.user, {
        ...state,
        isLoading: false,
        error: null
      });
    case ActionType.DELETE_REQUEST:
      return settingUserAdapter.removeOne(action.id, {
        ...state,
        isLoading: false,
        error: null
      });
    default:
      return state;
  }
}
