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
