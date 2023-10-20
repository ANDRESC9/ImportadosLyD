import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsPaidFilterComponent } from './credits-paid-filter.component';

describe('CreditsPaidFilterComponent', () => {
  let component: CreditsPaidFilterComponent;
  let fixture: ComponentFixture<CreditsPaidFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsPaidFilterComponent]
    });
    fixture = TestBed.createComponent(CreditsPaidFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
