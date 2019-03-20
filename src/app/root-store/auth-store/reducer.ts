import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function authReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SIGNIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case ActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: null,
        isTokenValid: true,
        isLoading: false
      };
    case ActionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isTokenValid: false,
        isLoading: false
      };
    case ActionTypes.VALIDATE_TOKEN_REQUEST:
      return {
        ...state,
        error: null,
        isTokenValid: false,
        isLoading: true
      };
    case ActionTypes.VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: null,
        isTokenValid: true,
        isLoading: false
      };
    case ActionTypes.VALIDATE_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isTokenValid: false,
        isLoading: false
      };
    default: {
      return state;
    }
  }
}
