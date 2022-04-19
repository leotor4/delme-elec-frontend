import { TestBed } from '@angular/core/testing';

import { UpdateDateService } from './update-date.service';

describe('UpdateDateService', () => {
  let service: UpdateDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
