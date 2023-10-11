import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsFilterComponent } from './credits-filter.component';

describe('CreditsFilterComponent', () => {
  let component: CreditsFilterComponent;
  let fixture: ComponentFixture<CreditsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsFilterComponent]
    });
    fixture = TestBed.createComponent(CreditsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
