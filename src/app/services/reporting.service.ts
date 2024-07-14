import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  constructor(private firestore: AngularFirestore) {}

  submitReport(report: any): Promise<any> {
    return this.firestore.collection('reports').add(report);
  }

  getReports(): Observable<any[]> {
    return this.firestore.collection('reports').valueChanges({ idField: 'id' });
  }

  updateReportStatus(reportId: string, status: string): Promise<void> {
    return this.firestore.doc(`reports/${reportId}`).update({ status });
  }
}