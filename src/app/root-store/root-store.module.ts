import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AuthStoreModule } from "./auth-store/auth-store.module";
import { ProductStoreModule } from "./product-store/product-store.module";
import { ApplicationStoreModule } from "./application-store/application-store.module";
import { SettingsUserStoreModule } from "./settings-user-store/settings-user-store.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    AuthStoreModule,
    ProductStoreModule,
    ApplicationStoreModule,
    SettingsUserStoreModule
  ]
})
export class RootStoreModule {}
