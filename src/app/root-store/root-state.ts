import { AuthStoreState } from './auth-store';
import { ProductStoreState } from './product-store';

export interface State {
  auth: AuthStoreState.State;
  product: ProductStoreState.State;
}
