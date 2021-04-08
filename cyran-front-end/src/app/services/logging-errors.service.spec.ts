import { TestBed } from '@angular/core/testing';

import { LoggingErrorsService } from './logging-errors.service';

describe('LoggingErrorsService', () => {
  let service: LoggingErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});