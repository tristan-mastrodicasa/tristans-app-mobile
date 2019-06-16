import { TestBed } from '@angular/core/testing';

import { GlobalStoreService } from './global-store.service';

describe('GlobalStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalStoreService = TestBed.get(GlobalStoreService);
    expect(service).toBeTruthy();
  });
});
