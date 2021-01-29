import { TestBed } from '@angular/core/testing';

import { MlrrUtilityService } from './mlrr-utility.service';

describe('MlrrUtilityService', () => {
  let service: MlrrUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MlrrUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
