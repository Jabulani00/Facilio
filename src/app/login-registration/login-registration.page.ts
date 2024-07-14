// login-registration.page.ts
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserProfileService } from '../services/user-profile.service';
import { FileStorageService } from '../services/file-storage.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.page.html',
  styleUrls: ['./login-registration.page.scss'],
})
export class LoginRegistrationPage {
  isLogin = true;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  userType: 'sp' | 'bm' = 'sp';
  images: File[] = [];
  document: File | null = null;

  constructor(
    private authService: AuthenticationService,
    private userProfileService: UserProfileService,
    private fileStorageService: FileStorageService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  async onSubmit() {
    if (this.isLogin) {
      await this.login();
    } else {
      await this.register();
    }
  }

  async login() {
    const loading = await this.loadingController.create({ message: 'Logging in...' });
    await loading.present();

    try {
      await this.authService.signIn(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login error', error);
      this.showAlert('Login Failed', 'Please check your credentials and try again.');
    } finally {
      loading.dismiss();
    }
  }

  async register() {
    if (this.password !== this.confirmPassword) {
      this.showAlert('Registration Failed', 'Passwords do not match.');
      return;
    }

    if (this.images.length !== 5 || !this.document) {
      this.showAlert('Registration Failed', 'Please upload 5 images and 1 document.');
      return;
    }

    const loading = await this.loadingController.create({ message: 'Registering...' });
    await loading.present();

    try {
      const userCredential = await this.authService.signUp(this.email, this.password);
      const userId = userCredential.user.uid;

      const imageUrls = await this.uploadFiles(userId, this.images, 'images');
      const documentUrl = await this.uploadFiles(userId, [this.document], 'documents');

      await this.userProfileService.updateUserProfile(userId, {
        email: this.email,
        userType: this.userType,
        status: 'pending',
        imageUrls,
        documentUrl: documentUrl[0],
      });

      this.showAlert('Registration Successful', 'Your account is pending approval.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration error', error);
      this.showAlert('Registration Failed', 'An error occurred during registration.');
    } finally {
      loading.dismiss();
    }
  }

  async uploadFiles(userId: string, files: File[], folder: string): Promise<string[]> {
    const uploadObservables = files.map(file => 
      this.fileStorageService.uploadFile(file, `${userId}/${folder}/${file.name}`).pipe(
        catchError(error => {
          console.error('File upload error:', error);
          return of('');  // Return an Observable of empty string if upload fails
        })
      )
    );
    
    try {
      const uploadedUrls = await forkJoin(uploadObservables).toPromise();
      return (uploadedUrls || []).filter(url => url !== '');
    } catch (error) {
      console.error('Error in uploadFiles:', error);
      return [];  // Return an empty array if the entire process fails
    }
  }


  onImageChange(event: any) {
    const files = event.target.files;
    if (files.length > 5) {
      this.showAlert('Upload Error', 'Please select only 5 images.');
      return;
    }
    this.images = Array.from(files);
  }

  onDocumentChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.document = files[0];
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}