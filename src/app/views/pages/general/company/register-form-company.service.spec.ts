import { TestBed } from '@angular/core/testing';

import { RegisterFormCompanyService } from './register-form-company.service';

describe('RegisterFormCompanyService', () => {
  let service: RegisterFormCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFormCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
