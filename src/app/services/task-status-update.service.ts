import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusUpdateService {
  constructor(private firestore: AngularFirestore) {}

  updateTaskStatus(taskId: string, status: string): Promise<void> {
    return this.firestore.doc(`tasks/${taskId}`).update({ status });
  }

  getTaskStatus(taskId: string): Observable<any> {
    return this.firestore.doc(`tasks/${taskId}`).valueChanges();
  }
}