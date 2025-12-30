import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { permitGuard } from './permit-guard';

describe('permitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => permitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
