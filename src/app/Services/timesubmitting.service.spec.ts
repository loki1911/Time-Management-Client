import { TestBed } from '@angular/core/testing';

import { TimesubmittingService } from './timesubmitting.service';

describe('TimesubmittingService', () => {
  let service: TimesubmittingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesubmittingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
