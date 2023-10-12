import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsHistoryComponent } from './credits-history.component';

describe('CreditsHistoryComponent', () => {
  let component: CreditsHistoryComponent;
  let fixture: ComponentFixture<CreditsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsHistoryComponent]
    });
    fixture = TestBed.createComponent(CreditsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
