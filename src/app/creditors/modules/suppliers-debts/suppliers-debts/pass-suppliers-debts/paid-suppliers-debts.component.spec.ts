import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidSuppliersDebtsComponent } from './paid-suppliers-debts.component';

describe('PaidSuppliersDebtsComponent', () => {
  let component: PaidSuppliersDebtsComponent;
  let fixture: ComponentFixture<PaidSuppliersDebtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaidSuppliersDebtsComponent]
    });
    fixture = TestBed.createComponent(PaidSuppliersDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
