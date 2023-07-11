import { TestBed } from '@angular/core/testing';

import { OwlCarouselService } from './owl-carousel.service';

describe('OwlCarouselService', () => {
  let service: OwlCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwlCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
