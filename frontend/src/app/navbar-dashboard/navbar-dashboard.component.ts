import { Component, Inject } from '@angular/core';
import { ShareService } from '../share';

@Component({
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar-dashboard.component.html',
  styleUrls: ['./navbar-dashboard.component.css'],
})
export class NavbarDashboardComponent {
  constructor(@Inject('ShareService') private shareService: ShareService) {}

  signOut(): void {
    this.shareService.signOut();
  }
}
