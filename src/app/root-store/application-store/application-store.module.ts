import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApplicationStoreEffects } from './effects';
import { applicationReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("application", applicationReducer),
    EffectsModule.forFeature([ApplicationStoreEffects])
  ]
})
export class ApplicationStoreModule { }
