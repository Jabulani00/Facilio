import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private firestore: AngularFirestore) {}

  sendNotification(notification: any): Promise<any> {
    return this.firestore.collection('notifications').add(notification);
  }

  getNotifications(userId: string): Observable<any[]> {
    return this.firestore.collection('notifications', ref => 
      ref.where('userId', '==', userId).orderBy('timestamp', 'desc')
    ).valueChanges({ idField: 'id' });
  }

  markNotificationAsRead(notificationId: string): Promise<void> {
    return this.firestore.doc(`notifications/${notificationId}`).update({ read: true });
  }
}