import { NgModule } from '@angular/core';
import { AngularTokenModule, AngularTokenOptions } from 'angular-token';

const options: AngularTokenOptions = {
  apiBase: 'https://open-copyright-platform2.herokuapp.com',
  signInRedirect: 'auth/signin'
};

@NgModule({
  imports: [AngularTokenModule.forRoot(options)],
  exports: [AngularTokenModule]
})
export class AppTokenModule { }
