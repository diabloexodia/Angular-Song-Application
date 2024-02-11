import { TestBed } from '@angular/core/testing';

import { MusicServicesService } from './music-services.service';

describe('MusicServicesService', () => {
  let service: MusicServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
