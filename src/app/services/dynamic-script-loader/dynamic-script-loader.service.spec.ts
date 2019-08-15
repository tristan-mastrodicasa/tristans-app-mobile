import { TestBed } from '@angular/core/testing';

import { DynamicScriptLoaderService } from './dynamic-script-loader.service';

describe('DynamicScriptLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicScriptLoaderService = TestBed.get(DynamicScriptLoaderService);
    expect(service).toBeTruthy();
  });
});
