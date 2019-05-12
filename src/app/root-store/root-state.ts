import { AuthStoreState } from './auth-store';
import { ProductStoreState } from './product-store';
import { ApplicationStoreState } from './application-store';

export interface State {
  auth: AuthStoreState.State;
  product: ProductStoreState.State;
  application: ApplicationStoreState.State
}
