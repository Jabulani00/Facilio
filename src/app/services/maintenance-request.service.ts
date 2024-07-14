import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  // createRequest(maintenance: any): Promise<any> {
  //   return this.firestore.collection('maintenanceRequests').add(maintenance);
  // }

}
