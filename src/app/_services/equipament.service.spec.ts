import { TestBed } from '@angular/core/testing';

import { EquipamentService } from './equipament.service';

describe('EquipamentService', () => {
  let service: EquipamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
