import { TestBed } from '@angular/core/testing';

import { EmplistService } from './emplist.service';

describe('EmplistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmplistService = TestBed.get(EmplistService);
    expect(service).toBeTruthy();
  });
});
