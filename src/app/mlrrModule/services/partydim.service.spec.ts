import { TestBed } from '@angular/core/testing';

import { PartydimService } from './partydim.service';

describe('PartydimService', () => {
  let service: PartydimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartydimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
