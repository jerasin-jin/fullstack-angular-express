import { TestBed } from '@angular/core/testing';

import { NavbarDashboardService } from './navbar-dashboard.service';

describe('NavbarDashboardService', () => {
  let service: NavbarDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
