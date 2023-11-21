import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/shared/interfaces/user.interfaces";
import { AuthService } from "src/app/shared/services/auth.service";
import { NavigationService } from "src/app/shared/services/navigation.service";
import { SearchService } from "src/app/shared/services/search.service";

@Component({
  selector: "app-header-sidebar-compact",
  templateUrl: "./header-sidebar-compact.component.html",
  styleUrls: ["./header-sidebar-compact.component.scss"]
})
export class HeaderSidebarCompactComponent implements OnInit {
  notifications: any[];
  user: User | null;
  
  constructor(
    private navService: NavigationService,
    public searchService: SearchService,
    private authService: AuthService,
    private router: Router
  ) {
    this.notifications = [
      {
        icon: "i-Speach-Bubble-6",
        title: "New message",
        badge: "3",
        text: "James: Hey! are you busy?",
        time: new Date(),
        status: "primary",
        link: "/chat"
      },
      {
        icon: "i-Receipt-3",
        title: "New order received",
        badge: "$4036",
        text: "1 Headphone, 3 iPhone x",
        time: new Date("11/11/2018"),
        status: "success",
        link: "/tables/full"
      },
      {
        icon: "i-Empty-Box",
        title: "Product out of stock",
        text: "Headphone E67, R98, XL90, Q77",
        time: new Date("11/10/2018"),
        status: "danger",
        link: "/tables/list"
      },
      {
        icon: "i-Data-Power",
        title: "Server up!",
        text: "Server rebooted successfully",
        time: new Date("11/08/2018"),
        status: "success",
        link: "/dashboard/v2"
      },
      {
        icon: "i-Data-Block",
        title: "Server down!",
        badge: "Resolved",
        text: "Region 1: Server crashed!",
        time: new Date("11/06/2018"),
        status: "danger",
        link: "/dashboard/v3"
      }
    ];
  }

  ngOnInit() {
    this.user = this.authService.getStoredUser()
  }

  /*
  get User():User | undefined {
    return this.authService._currentUser;
  }
  */

  toggelSidebar() {
    const state = this.navService.sidebarState;
    state.sidenavOpen = !state.sidenavOpen;
    state.childnavOpen = !state.childnavOpen;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/sessions/signin']);
  }
}
