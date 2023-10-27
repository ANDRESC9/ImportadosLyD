import { TestBed } from '@angular/core/testing';

import { AbcComponentService } from './abc-component.service';

describe('AbcComponentService', () => {
  let service: AbcComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbcComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
