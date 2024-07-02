import { TestBed } from '@angular/core/testing';

import { DbProductCreateService } from './db-product-create.service';

describe('DbProductCreateService', () => {
  let service: DbProductCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbProductCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
