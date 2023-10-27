import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorsMenuComponent } from './creditors-menu.component';

describe('CreditorsMenuComponent', () => {
  let component: CreditorsMenuComponent;
  let fixture: ComponentFixture<CreditorsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditorsMenuComponent]
    });
    fixture = TestBed.createComponent(CreditorsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
