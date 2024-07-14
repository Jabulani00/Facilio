import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingAndReviewPage } from './rating-and-review.page';

describe('RatingAndReviewPage', () => {
  let component: RatingAndReviewPage;
  let fixture: ComponentFixture<RatingAndReviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingAndReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
