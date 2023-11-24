import { TestBed } from '@angular/core/testing';

import { ModalInventoryService } from './modal-inventory.service';

describe('ModalInventoryService', () => {
  let service: ModalInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
