import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {
  constructor(private firestore: AngularFirestore) {}

  getServiceProviders(): Observable<any[]> {
    return this.firestore.collection('serviceProviders').valueChanges({ idField: 'id' });
  }

  updateServiceProviderProfile(id: string, data: any): Promise<void> {
    return this.firestore.doc(`serviceProviders/${id}`).update(data);
  }

  getServiceProviderById(id: string): Observable<any> {
    return this.firestore.doc(`serviceProviders/${id}`).valueChanges();
  }

  
}