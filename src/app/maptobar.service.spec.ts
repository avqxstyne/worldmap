import { TestBed } from '@angular/core/testing';

import { MaptobarService } from './maptobar.service';

describe('MaptobarService', () => {
  let service: MaptobarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaptobarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
