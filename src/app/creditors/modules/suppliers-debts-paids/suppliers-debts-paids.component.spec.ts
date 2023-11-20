import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersDebtsPaidsComponent } from './suppliers-debts-paids.component';

describe('SuppliersDebtsPaidsComponent', () => {
  let component: SuppliersDebtsPaidsComponent;
  let fixture: ComponentFixture<SuppliersDebtsPaidsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersDebtsPaidsComponent]
    });
    fixture = TestBed.createComponent(SuppliersDebtsPaidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
