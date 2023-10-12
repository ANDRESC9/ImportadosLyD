import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsPaidComponent } from './credits-paid.component';

describe('CreditsPaidComponent', () => {
  let component: CreditsPaidComponent;
  let fixture: ComponentFixture<CreditsPaidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsPaidComponent]
    });
    fixture = TestBed.createComponent(CreditsPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
