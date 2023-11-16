import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from './shared/interfaces';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bootDash';

  private authStatusSubscription: Subscription;
  public finishedAuthCheck: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authStatusSubscription = this.authService.authStatus.subscribe((status) => {
      switch (status) {
        case AuthStatus.checking:
          this.finishedAuthCheck = false;
          break;

        case AuthStatus.authenticated:
          this.router.navigateByUrl('dashboard/v1');
          this.finishedAuthCheck = true;
          break;

        case AuthStatus.notAuthenticated:
          this.router.navigateByUrl('/sessions/signin');
          this.finishedAuthCheck = true;
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
