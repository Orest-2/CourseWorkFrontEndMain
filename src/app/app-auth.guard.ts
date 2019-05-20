import { Injectable } from "@angular/core";
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from "@angular/router";
import { Store } from "@ngrx/store";
import { RootStoreState, AuthStoreActions } from "./root-store";
import { AngularTokenService } from "angular-token";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store$: Store<RootStoreState.State>,
    private dataService: AngularTokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userData = this.dataService.currentUserData;
    const authData = this.dataService.currentAuthData;

    if (authData && userData === undefined) {
      this.store$.dispatch(new AuthStoreActions.ValidateTokenRequestAction());
    } else if (userData === undefined) {
      this.router.navigateByUrl("auth/signin");
    }

    return authData ? true : false;
  }
}
