import { initialState, State, applicationAdapter } from "./state";
import { Action, ActionType } from "./actions";

export function applicationReducer(
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
    case ActionType.LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    case ActionType.LOAD_SUCCESS:
      return applicationAdapter.addAll(action.payload.applications, {
        ...state,
        isLoading: false,
        error: null
      });
    case ActionType.CREATE_REQUEST:
      return applicationAdapter.addOne(action.application, {
        ...state,
        isLoading: false,
        error: null
      });
    case ActionType.UPDATE_REQUEST:
      return applicationAdapter.updateOne(
        { id: action.id, changes: action.changes },
        {
          ...state,
          isLoading: false,
          error: null
        }
      );
    case ActionType.DELETE_REQUEST:
      return applicationAdapter.removeOne(action.id, {
        ...state,
        isLoading: false,
        error: null
      });
    default:
      return state;
  }
}
