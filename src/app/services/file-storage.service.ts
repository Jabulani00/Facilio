// services/file-storage.service.ts
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File, path: string): Observable<number | undefined> {
    const filePath = `${path}/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    return task.percentageChanges();
  }

  getFileUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }

  deleteFile(path: string): Promise<void> {
    return this.storage.ref(path).delete().toPromise();
  }
}