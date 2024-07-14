import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private firestore: AngularFirestore) {}

  updateUserProfile(userId: string, data: any): Promise<void> {
    return this.firestore.doc(`users/${userId}`).update(data);
  }

  getUserProfile(userId: string): Observable<any> {
    return this.firestore.doc(`users/${userId}`).valueChanges();
  }
}