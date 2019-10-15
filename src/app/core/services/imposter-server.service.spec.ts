import { TestBed } from '@angular/core/testing';

import { ImposterServerService } from './imposter-server.service';

describe('ImposterServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImposterServerService = TestBed.get(ImposterServerService);
    expect(service).toBeTruthy();
  });
});
