import { TestBed } from '@angular/core/testing';

import { SpreedService } from './spreed.service';

describe('SpreedService', () => {
  let service: SpreedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpreedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
