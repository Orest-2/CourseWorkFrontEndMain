import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { settingsUserReducer } from "./reducer";
import { SettingsUserStoreEffects } from "./effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("settingsUser", settingsUserReducer),
    EffectsModule.forFeature([SettingsUserStoreEffects])
  ],
  providers: [SettingsUserStoreEffects]
})
export class SettingsUserStoreModule {}
