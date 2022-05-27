import { TestBed } from '@angular/core/testing';

import { RegulatoryNormService } from './regulatory-norm.service';

describe('RegulatoryNormService', () => {
  let service: RegulatoryNormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegulatoryNormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
