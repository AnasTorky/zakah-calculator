import { TestBed } from '@angular/core/testing';

import { ZakahIndividualService } from './zakah-individual-service';

describe('ZakahIndividualService', () => {
  let service: ZakahIndividualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZakahIndividualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
