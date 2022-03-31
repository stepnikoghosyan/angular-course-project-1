import { TestBed } from '@angular/core/testing';

import { FileSizeValidatorService } from './file-size-validator.service';

describe('FileSizeValidatorService', () => {
  let service: FileSizeValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSizeValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
