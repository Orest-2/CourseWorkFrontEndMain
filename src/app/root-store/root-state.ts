import { AuthStoreState } from "./auth-store";
import { ProductStoreState } from "./product-store";
import { ApplicationStoreState } from "./application-store";
import { SettingsUserStoreState } from "./settings-user-store";

export interface State {
  auth: AuthStoreState.State;
  product: ProductStoreState.State;
  application: ApplicationStoreState.State;
  settingsUser: SettingsUserStoreState.State;
}
