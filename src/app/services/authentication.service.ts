// authentication.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of, switchMap, catchError } from 'rxjs';
import { UserProfileService } from './user-profile.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private userProfileService: UserProfileService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        console.log('Auth state changed:', user);
        if (user && user.email) {
          console.log('Fetching user profile for:', user.email);
          return this.userProfileService.getUserProfile(user.email).pipe(
            catchError(error => {
              console.error('Error fetching user profile:', error);
              return of(null);
            })
          );
        } else {
          console.log('No user or email, returning null');
          return of(null);
        }
      }),
      catchError(error => {
        console.error('Error in user$ observable:', error);
        return of(null);
      })
    );
  }

  async signUp(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      throw error; // Propagate the error to handle in the calling component
    }
  }

  async signIn(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      throw error; // Propagate the error to handle in the calling component
    }
  }

  async signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  async resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
