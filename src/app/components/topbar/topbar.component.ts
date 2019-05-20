import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { RootStoreState, AuthStoreSelectors } from "src/app/root-store";
import { AngularTokenService } from "angular-token";
import { User } from "src/app/models";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"]
})
export class TopbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private store$: Store<RootStoreState.State>,
    private tokenService: AngularTokenService
  ) {}

  ngOnInit() {
    this.user$ = this.store$.select(AuthStoreSelectors.selectSigninUser);
  }

  signOut() {
    this.tokenService
      .signOut()
      .subscribe(res => console.log(res), error => console.log(error));
  }
}
