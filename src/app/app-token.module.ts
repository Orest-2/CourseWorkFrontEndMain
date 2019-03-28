import { NgModule } from '@angular/core';
import { AngularTokenModule, AngularTokenOptions } from 'angular-token';
import { appConfig } from './app.config';

const options: AngularTokenOptions = {
  apiBase: appConfig.API_BASE,
  signInRedirect: 'auth/signin'
};

@NgModule({
  imports: [AngularTokenModule.forRoot(options)],
  exports: [AngularTokenModule]
})
export class AppTokenModule { }
