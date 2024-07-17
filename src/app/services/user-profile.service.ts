import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { FileStorageService } from './file-storage.service';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(
    private firestore: AngularFirestore,
    private fileStorage: FileStorageService
  ) {}

  updateUserProfile(userId: string, data: any, profilePicture?: File): Observable<any> {
    if (profilePicture) {
      return this.fileStorage.uploadFile(profilePicture, `profile-pictures/${userId}`).pipe(
        switchMap(downloadURL => {
          data.profilePictureUrl = downloadURL;
          return this.firestore.doc(`users/${userId}`).update(data);
        })
      );
    } else {
      return new Observable(observer => {
        this.firestore.doc(`users/${userId}`).update(data)
          .then(() => observer.next())
          .catch(error => observer.error(error))
          .finally(() => observer.complete());
      });
    }
  }

 // services/user-profile.service.ts

 getUserProfile(email: string): Observable<any> {
  console.log('Getting user profile for email:', email);
  return this.firestore.collection('users', ref => ref.where('email', '==', email))
    .valueChanges({ idField: 'userId' })
    .pipe(
      map(users => {
        console.log('Users found:', users);
        return users.length > 0 ? users[0] : null;
      }),
      catchError(error => {
        console.error('Error fetching user profile:', error);
        return of(null);
      })
    );
}
}