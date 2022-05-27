import { TestBed } from '@angular/core/testing';

import { NbrNormService } from './nbr-norm.service';

describe('NbrNormService', () => {
  let service: NbrNormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbrNormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
