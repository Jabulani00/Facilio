// services/user-profile.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FileStorageService } from './file-storage.service';
import { switchMap } from 'rxjs/operators';

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

  getUserProfile(userId: string): Observable<any> {
    return this.firestore.doc(`users/${userId}`).valueChanges();
  }
}