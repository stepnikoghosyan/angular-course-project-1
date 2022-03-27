import { TestBed } from '@angular/core/testing';

import { AuthCanActivateGuard } from './auth-can-activate.guard';

describe('AuthCanActivateGuard', () => {
  let guard: AuthCanActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCanActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
