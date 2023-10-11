import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsTableComponent } from './credits-table.component';

describe('CreditsTableComponent', () => {
  let component: CreditsTableComponent;
  let fixture: ComponentFixture<CreditsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsTableComponent]
    });
    fixture = TestBed.createComponent(CreditsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
