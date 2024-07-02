import { Injectable, inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  NavigationEnd,
} from '@angular/router';
import { decodeToken } from '../../util';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable()
export class GuardService {
  previousUrl = new BehaviorSubject<string>(null);
  currentUrl: string;
  constructor(private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // console.log('prev:', event.url);
        this.setPreviousUrl(event.url);
      });

    this.getPreviousUrl().subscribe((e) => (this.currentUrl = e));
  }
  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token == null) {
      return this.router.createUrlTree(['/signIn']);
    }

    return true;
  }

  adminActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token == null) {
      return this.router.createUrlTree(['/signIn']);
    }

    const decode = decodeToken(token);

    if (decode.role != 'admin') {
      console.log('return false', this.currentUrl);
      return this.router.createUrlTree(['/products']);
    }

    return true;
  }

  cannotActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token == null) return true;
    return this.router.createUrlTree(['/products']);
  }

  public setPreviousUrl(payload: string) {
    return this.previousUrl.next(payload);
  }

  public getPreviousUrl() {
    return this.previousUrl.asObservable();
  }
}

export const adminRoute: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(GuardService).adminActivate();
};

export const privateRoute: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(GuardService).canActivate();
};

export const publicRoute: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(GuardService).cannotActivate();
};
