import { TestBed } from '@angular/core/testing';

import { FileTypeValidatorService } from './file-type-validator.service';

describe('FileTypeValidatorService', () => {
  let service: FileTypeValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileTypeValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
