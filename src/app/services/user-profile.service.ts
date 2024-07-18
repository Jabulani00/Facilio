// services/user-profile.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FileStorageService } from './file-storage.service';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(
    private firestore: AngularFirestore,
    private fileStorage: FileStorageService,
    private functions: AngularFireFunctions
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

  getUserProfile(email: string): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('email', '==', email))
      .valueChanges({ idField: 'userId' })
      .pipe(
        map(users => users.length > 0 ? users[0] : null)
      );
  }

  async reportIssue(buildingManagerEmail: string, serviceProviderEmail: string, issue: string): Promise<void> {
    await this.firestore.collection('issues').add({
      buildingManagerEmail,
      serviceProviderEmail,
      issue,
      reportedAt: new Date()
    });
  }
  async suspendAccount(userId: string) {
    try {
      await this.firestore.collection('users').doc(userId).update({ status: 'suspended' });
      // Optionally, trigger email notification here
    } catch (error) {
      console.error('Error suspending account:', error);
      throw error;
    }
  }

  async activateAccount(userId: string) {
    try {
      await this.firestore.collection('users').doc(userId).update({ status: 'active' });
    } catch (error) {
      console.error('Error activating account:', error);
      throw error;
    }
  }
  async resolveIssue(issueId: string, adminEmail: string, resolutionMessage: string) {
    try {
      // Update issue status in Firestore
      await this.firestore.collection('issues').doc(issueId).update({ status: 'resolved', resolutionMessage, resolvedAt: new Date() });

      // Send email notification
      const callable = this.functions.httpsCallable('sendEmail');
      await callable({ to: adminEmail, subject: 'Issue Resolved', text: resolutionMessage }).toPromise();
    } catch (error) {
      console.error('Error resolving issue and sending email:', error);
      throw error;
    }
  }
  async updateIssueStatusById(issueId: string, status: string, resolvedAt: Date) {
    try {
      await this.firestore.collection('issues').doc(issueId).update({ status, resolvedAt });
    } catch (error) {
      console.error('Error updating issue status:', error);
      throw error;
    }
  }

  async updateIssueStatusByEmail(buildingManagerEmail: string, status: string) {
    const querySnapshot = await this.firestore.collection('issues', ref => ref.where('buildingManagerEmail', '==', buildingManagerEmail)).get().toPromise();
    
    if (!querySnapshot || querySnapshot.empty) {
      console.error('No issues found for the specified email.');
      return;
    }

    const batch = this.firestore.firestore.batch();
    
    querySnapshot.forEach(doc => {
      batch.update(doc.ref, { status });
    });

    await batch.commit();
  }
}