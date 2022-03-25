import { TestBed } from '@angular/core/testing';

import { AuthPublicGuard } from './auth-public.guard';

describe('AuthPublicGuard', () => {
  let guard: AuthPublicGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPublicGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
