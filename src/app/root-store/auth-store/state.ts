import { User } from "../../models";

export interface State {
  user: User | null;
  isTokenValid: boolean | null;
  isLoading: boolean;
  errorSignIn: string;
  errorSignUp: string;
}

export const initialState: State = {
  user: null,
  isLoading: false,
  isTokenValid: null,
  errorSignIn: null,
  errorSignUp: null
};
