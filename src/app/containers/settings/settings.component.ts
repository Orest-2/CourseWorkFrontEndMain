import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models";
import { RootStoreState, AuthStoreSelectors } from "src/app/root-store";
import { Store } from "@ngrx/store";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private store$: Store<RootStoreState.State>,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle("Settings");

    this.user$ = this.store$.select(AuthStoreSelectors.selectSigninUser);
  }
}
