import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbProductCreateComponent } from './db-product-create.component';

describe('DbProductCreateComponent', () => {
  let component: DbProductCreateComponent;
  let fixture: ComponentFixture<DbProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbProductCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
