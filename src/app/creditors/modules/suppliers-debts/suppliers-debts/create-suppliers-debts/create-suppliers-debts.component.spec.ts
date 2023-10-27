import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuppliersDebtsComponent } from './create-suppliers-debts.component';

describe('CreateSuppliersDebtsComponent', () => {
  let component: CreateSuppliersDebtsComponent;
  let fixture: ComponentFixture<CreateSuppliersDebtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSuppliersDebtsComponent]
    });
    fixture = TestBed.createComponent(CreateSuppliersDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
