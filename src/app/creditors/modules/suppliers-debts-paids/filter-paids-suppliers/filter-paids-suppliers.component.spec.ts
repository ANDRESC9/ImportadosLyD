import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPaidsSuppliersComponent } from './filter-paids-suppliers.component';

describe('FilterPaidsSuppliersComponent', () => {
  let component: FilterPaidsSuppliersComponent;
  let fixture: ComponentFixture<FilterPaidsSuppliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPaidsSuppliersComponent]
    });
    fixture = TestBed.createComponent(FilterPaidsSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
