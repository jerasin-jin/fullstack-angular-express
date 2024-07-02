import { Component, Inject, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { ShareService } from './share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject('ShareService') private shareService: ShareService
  ) {}
  title = 'Front End';
  masterPath = 'dashboard';

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('init byPassLogout and navBar', event.url);

        const includePath = event.url.split('/');
        const includeQueryStringPath = event.url.split('?');
        console.log('includePath', includePath);
        console.log('includeQueryStringPath', includeQueryStringPath);
        this.shareService.byPassLogout();
        if (
          includePath.includes(this.masterPath) ||
          includeQueryStringPath.includes(this.masterPath)
        ) {
          this.shareService.showNavbarDashBoard();
        } else {
          this.shareService.showNavbar();
        }
      });
  }
}
