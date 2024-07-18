import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {
  saveImageUrl(requestId: string, imageUrl: string): Promise<any> {
    return this.firestore.collection('maintenanceRequests').doc(requestId).collection('images').add({ url: imageUrl });
  }
  constructor(private firestore: AngularFirestore) {}

  createRequest(request: any): Promise<any> {
    return this.firestore.collection('maintenanceRequests').add(request);
  }

  getRequests(): Observable<any[]> {
    return this.firestore.collection('maintenanceRequests').valueChanges({ idField: 'id' });
  }

  updateRequest(id: string, data: any): Promise<void> {
    return this.firestore.doc(`maintenanceRequests/${id}`).update(data);
  }

  deleteRequest(id: string): Promise<void> {
    return this.firestore.doc(`maintenanceRequests/${id}`).delete();
  }

  updateRequestByIdAndEmail(requestId: string, email: string, data: any): Promise<void> {
    return this.firestore.collection('maintenanceRequests')
      .ref.where('id', '==', requestId)
      .where('serviceProvider.email', '==', email)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const docRef = snapshot.docs[0].ref;
          return docRef.update(data);
        } else {
          throw new Error('No matching document found');
        }
      });
    }

    deleteServiceProviderByIdAndEmail(requestId: string, email: string): Promise<void> {
      return this.firestore.collection('maintenanceRequests')
        .ref.where('id', '==', requestId)
        .where('serviceProvider.email', '==', email)
        .get()
        .then(snapshot => {
          if (!snapshot.empty) {
            const docRef = snapshot.docs[0].ref;
            return docRef.update({
              'serviceProvider': firebase.firestore.FieldValue.delete()
            });
          } else {
            throw new Error('No matching document found');
          }
        });
    }

  // createRequest(maintenance: any): Promise<any> {
  //   return this.firestore.collection('maintenanceRequests').add(maintenance);
  // }

}
