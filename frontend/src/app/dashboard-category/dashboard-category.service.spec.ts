import { TestBed } from '@angular/core/testing';

import { DashboardCategoryService } from './dashboard-category.service';

describe('DashboardCategoryService', () => {
  let service: DashboardCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
