import { Action, ActionType } from "./actions";
import { initialState, State, productAdapter } from "./state";

export function productReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ActionType.LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case ActionType.LOAD_SUCCESS:
      return productAdapter.addAll(action.payload.products, {
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
      return productAdapter.addOne(action.product, {
        ...state,
        isLoading: false,
        error: null
      });
    case ActionType.UPDATE_REQUEST:
      return productAdapter.updateOne(
        { id: action.id, changes: action.changes },
        {
          ...state,
          isLoading: false,
          error: null
        }
      );
    case ActionType.DELETE_REQUEST:
      return productAdapter.removeOne(action.id, {
        ...state,
        isLoading: false,
        error: null
      });
    default:
      return state;
  }
}
