import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  showIcon = window.screen.width < 768;
  sidebarItems = [
    {
      title: "Dashboard",
      faIcon: "fas fa-fw fa-tachometer-alt",
      link: "/dashboard",
      collapse: false
    },
    {
      id: "collapseProd",
      title: "Products",
      faIcon: "fas fa-fw fa-box",
      collapse: false,
      link: "/products",
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
      collapse: false
    }
  ];

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.showIcon = !this.showIcon;
  }
}
