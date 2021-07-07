import { TestBed } from '@angular/core/testing';

import { AbsenceService } from './absence.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('AbsenceService', () => {
  let service: AbsenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AbsenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
