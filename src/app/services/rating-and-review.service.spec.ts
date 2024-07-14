import { TestBed } from '@angular/core/testing';

import { RatingAndReviewService } from './rating-and-review.service';

describe('RatingAndReviewService', () => {
  let service: RatingAndReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingAndReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
