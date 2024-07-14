import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingAndReviewService {
  constructor(private firestore: AngularFirestore) {}

  submitRating(rating: any): Promise<any> {
    return this.firestore.collection('ratings').add(rating);
  }

  submitReview(review: any): Promise<any> {
    return this.firestore.collection('reviews').add(review);
  }

  getRatingsForProvider(providerId: string): Observable<any[]> {
    return this.firestore.collection('ratings', ref => ref.where('providerId', '==', providerId)).valueChanges();
  }

  getReviewsForProvider(providerId: string): Observable<any[]> {
    return this.firestore.collection('reviews', ref => ref.where('providerId', '==', providerId)).valueChanges();
  }
}