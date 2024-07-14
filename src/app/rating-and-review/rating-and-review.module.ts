import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingAndReviewPageRoutingModule } from './rating-and-review-routing.module';

import { RatingAndReviewPage } from './rating-and-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingAndReviewPageRoutingModule
  ],
  declarations: [RatingAndReviewPage]
})
export class RatingAndReviewPageModule {}
