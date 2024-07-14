import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private firestore: AngularFirestore) {}

  getUserManagementData(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges({ idField: 'id' });
  }

  getRoleManagementData(): Observable<any[]> {
    return this.firestore.collection('roles').valueChanges({ idField: 'id' });
  }

  getAnalyticsData(): Observable<any> {
    return this.firestore.collection('analytics').doc('summary').valueChanges();
  }

  manageUserRoles(userId: string, role: string): Promise<void> {
    return this.firestore.doc(`users/${userId}`).update({ role });
  }
}