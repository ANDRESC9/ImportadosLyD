import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDebtorsComponent } from './list-debtors.component';

describe('ListDebtorsComponent', () => {
  let component: ListDebtorsComponent;
  let fixture: ComponentFixture<ListDebtorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDebtorsComponent]
    });
    fixture = TestBed.createComponent(ListDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
