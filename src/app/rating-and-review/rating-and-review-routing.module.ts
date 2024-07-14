import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingAndReviewPage } from './rating-and-review.page';

const routes: Routes = [
  {
    path: '',
    component: RatingAndReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingAndReviewPageRoutingModule {}
