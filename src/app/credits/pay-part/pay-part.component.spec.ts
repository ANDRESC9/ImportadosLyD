import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPartComponent } from './pay-part.component';

describe('PayPartComponent', () => {
  let component: PayPartComponent;
  let fixture: ComponentFixture<PayPartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayPartComponent]
    });
    fixture = TestBed.createComponent(PayPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
