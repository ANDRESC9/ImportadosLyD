import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDebtorComponent } from './edit-debtor.component';

describe('EditDebtorComponent', () => {
  let component: EditDebtorComponent;
  let fixture: ComponentFixture<EditDebtorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDebtorComponent]
    });
    fixture = TestBed.createComponent(EditDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
