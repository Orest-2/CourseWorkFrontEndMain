import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootStoreState, AuthStoreSelectors } from "src/app/root-store";
import { Observable, of } from "rxjs";
import { User } from "src/app/models";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  user$: Observable<User>;
  showIcon = window.screen.width < 768;
  sidebarItems = [];

  constructor(private store$: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.user$ = this.store$.select(AuthStoreSelectors.selectSigninUser);

    this.user$.pipe(filter(user => !!user)).subscribe(user => {
      this.sidebarItems = [
        {
          title: "Dashboard",
          faIcon: "fas fa-fw fa-tachometer-alt",
          link: "/dashboard",
          show: true,
          collapse: false
        },
        {
          id: "collapseProd",
          title: "Products",
          faIcon: "fas fa-fw fa-box",
          link: "/products",
          collapse: false,
          show: user.is_customer,
          collapseItems: [
            {
              title: "New",
              link: "/auth/sign_in"
            },
            {
              title: "List",
              link: "/products/list"
            }
          ]
        },
        {
          title: "Applications",
          faIcon: "far fa-list-alt",
          link: "/applications",
          show: true,
          collapse: false
        }
      ];
    });
  }

  toggle() {
    this.showIcon = !this.showIcon;
  }
}
