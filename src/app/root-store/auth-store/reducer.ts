import { Actions, ActionTypes } from "./actions";
import { initialState, State } from "./state";

export function authReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SIGNIN_REQUEST:
      return {
        ...state,
        errorSignIn: null,
        isLoading: true
      };
    case ActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        errorSignIn: null,
        isTokenValid: true,
        isLoading: false
      };
    case ActionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        errorSignIn: action.payload.error,
        isTokenValid: false,
        isLoading: false
      };
    case ActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        errorSignUp: null,
        isLoading: true
      };
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        errorSignUp: null,
        isTokenValid: true,
        isLoading: false
      };
    case ActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        errorSignUp: action.payload.error,
        isTokenValid: false,
        isLoading: false
      };
    case ActionTypes.VALIDATE_TOKEN_REQUEST:
      return {
        ...state,
        errorSignIn: null,
        isTokenValid: null,
        isLoading: true
      };
    case ActionTypes.VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        errorSignIn: null,
        isTokenValid: true,
        isLoading: false
      };
    case ActionTypes.VALIDATE_TOKEN_FAILURE:
      return {
        ...state,
        errorSignIn: action.payload.error,
        isTokenValid: false,
        isLoading: false
      };
    default: {
      return state;
    }
  }
}
