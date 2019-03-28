import { User } from '../../models';

export interface State {
  user: User | null;
  isTokenValid: boolean | null;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  user: null,
  isLoading: false,
  isTokenValid: null,
  error: null
};
