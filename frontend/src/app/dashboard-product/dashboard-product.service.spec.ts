import { TestBed } from '@angular/core/testing';

import { DashboardProductService } from './dashboard-product.service';

describe('DashboardProductService', () => {
  let service: DashboardProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
