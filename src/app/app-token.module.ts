import { NgModule } from "@angular/core";
import { AngularTokenModule, AngularTokenOptions } from "angular-token";
import { AppConfig } from "./app.config";

const options: AngularTokenOptions = {
  apiBase: AppConfig.BASE_URL,
  signInRedirect: "auth/signin"
};

@NgModule({
  imports: [AngularTokenModule.forRoot(options)],
  exports: [AngularTokenModule]
})
export class AppTokenModule {}
