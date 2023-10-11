import { TestBed } from '@angular/core/testing';

import { LoadModalsService } from './load-modals.service';

describe('LoadModalsService', () => {
  let service: LoadModalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadModalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
