import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsFilterComponent } from './debtors-filter.component';

describe('DebtorsFilterComponent', () => {
  let component: DebtorsFilterComponent;
  let fixture: ComponentFixture<DebtorsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebtorsFilterComponent]
    });
    fixture = TestBed.createComponent(DebtorsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
