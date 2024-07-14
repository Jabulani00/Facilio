import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {
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
}