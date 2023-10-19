import { TestBed } from '@angular/core/testing';

import { SingleQuotesService } from './single-quotes.service';

describe('SingleQuotesService', () => {
  let service: SingleQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
