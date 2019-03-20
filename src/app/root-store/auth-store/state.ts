import { User } from '../../models';

export interface State {
  user: User | null;
  isTokenValid: boolean;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  user: null,
  isLoading: false,
  isTokenValid: false,
  error: null
};
