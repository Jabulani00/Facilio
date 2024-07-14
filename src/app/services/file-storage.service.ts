// file-storage.service.ts
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File, path: string): Observable<string> {
    const filePath = `${path}/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return from(task).pipe(
      switchMap(() => fileRef.getDownloadURL()),
      catchError(error => {
        console.error('Upload error:', error);
        return of('');  // Return an Observable of empty string in case of error
      })
    );
  }
  getFileUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }

  deleteFile(path: string): Promise<void> {
    return this.storage.ref(path).delete().toPromise();
  }
}