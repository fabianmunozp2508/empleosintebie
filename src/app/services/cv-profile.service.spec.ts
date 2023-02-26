import { TestBed } from '@angular/core/testing';

import { CvProfileService } from './cv-profile.service';

describe('CvProfileService', () => {
  let service: CvProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
