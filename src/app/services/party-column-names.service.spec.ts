import { TestBed } from '@angular/core/testing';

import { PartyColumnNamesService } from './party-column-names.service';

describe('PartyColumnNamesService', () => {
  let service: PartyColumnNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyColumnNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
