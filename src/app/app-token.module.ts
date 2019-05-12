import { NgModule } from '@angular/core';
import { AngularTokenModule, AngularTokenOptions } from 'angular-token';
import { appConfig } from './app.config';

const options: AngularTokenOptions = {
  apiBase: appConfig.BASE_URL,
  signInRedirect: 'auth/signin'
};

@NgModule({
  imports: [AngularTokenModule.forRoot(options)],
  exports: [AngularTokenModule]
})
export class AppTokenModule { }
