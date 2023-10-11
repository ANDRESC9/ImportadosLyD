import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsMenuComponent } from './credits-menu.component';

describe('CreditsMenuComponent', () => {
  let component: CreditsMenuComponent;
  let fixture: ComponentFixture<CreditsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsMenuComponent]
    });
    fixture = TestBed.createComponent(CreditsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
