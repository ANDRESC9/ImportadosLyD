import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSuppliersDebtsComponent } from './filter-suppliers-debts.component';

describe('FilterSuppliersDebtsComponent', () => {
  let component: FilterSuppliersDebtsComponent;
  let fixture: ComponentFixture<FilterSuppliersDebtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSuppliersDebtsComponent]
    });
    fixture = TestBed.createComponent(FilterSuppliersDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
