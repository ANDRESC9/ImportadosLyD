import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySuppliersDebtsComponent } from './history-suppliers-debts.component';

describe('HistorySuppliersDebtsComponent', () => {
  let component: HistorySuppliersDebtsComponent;
  let fixture: ComponentFixture<HistorySuppliersDebtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorySuppliersDebtsComponent]
    });
    fixture = TestBed.createComponent(HistorySuppliersDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
