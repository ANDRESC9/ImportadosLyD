import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDebtorComponent } from './new-debtor.component';

describe('NewDebtorComponent', () => {
  let component: NewDebtorComponent;
  let fixture: ComponentFixture<NewDebtorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDebtorComponent]
    });
    fixture = TestBed.createComponent(NewDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
