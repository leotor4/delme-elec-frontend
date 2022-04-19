import { TestBed } from '@angular/core/testing';

import { NonComplianceService } from './non-compliance.service';

describe('NonComplianceService', () => {
  let service: NonComplianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonComplianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
