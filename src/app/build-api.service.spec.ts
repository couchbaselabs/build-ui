import { TestBed } from '@angular/core/testing';

import { BuildApiService } from './build-api.service';

describe('BuildApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildApiService = TestBed.get(BuildApiService);
    expect(service).toBeTruthy();
  });
});
