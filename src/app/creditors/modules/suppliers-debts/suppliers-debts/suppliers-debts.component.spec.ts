import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersDebtsComponent } from './suppliers-debts.component';

describe('SuppliersDebtsComponent', () => {
  let component: SuppliersDebtsComponent;
  let fixture: ComponentFixture<SuppliersDebtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersDebtsComponent]
    });
    fixture = TestBed.createComponent(SuppliersDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
