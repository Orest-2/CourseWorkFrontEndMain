import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { productReducer } from "./reducer";
import { EffectsModule } from "@ngrx/effects";
import { ProductStoreEffects } from "./effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("product", productReducer),
    EffectsModule.forFeature([ProductStoreEffects])
  ],
  providers: [ProductStoreEffects]
})
export class ProductStoreModule {}
