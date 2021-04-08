import { TestBed } from '@angular/core/testing';

import { LoggingInfoService } from './logging-info.service';

describe('LoggingInfoService', () => {
  let service: LoggingInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});