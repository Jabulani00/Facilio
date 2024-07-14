import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  constructor(private firestore: AngularFirestore) {}

  sendMessage(message: any): Promise<any> {
    return this.firestore.collection('messages').add(message);
  }

  getMessages(userId: string): Observable<any[]> {
    return this.firestore.collection('messages', ref => 
      ref.where('recipientId', '==', userId).orderBy('timestamp')
    ).valueChanges({ idField: 'id' });
  }

  markMessageAsRead(messageId: string): Promise<void> {
    return this.firestore.doc(`messages/${messageId}`).update({ read: true });
  }
}