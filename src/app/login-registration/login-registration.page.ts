import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserProfileService } from '../services/user-profile.service';
import { FileStorageService } from '../services/file-storage.service';
import { LocationService } from '../services/location.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  documents: File[] = [];
  name: string = '';
  surname: string = '';
  phoneNumber: string = '';
  location: string = '';
  services: string = ''; // For SP
  buildingName: string = ''; // For BM
  buildingType: string = ''; // For BM

  constructor(
    private authService: AuthenticationService,
    private userProfileService: UserProfileService,
    private fileStorageService: FileStorageService,
    private locationService: LocationService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router,
    private firestore: AngularFirestore
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

  // login-registration.page.ts

  async login() {
    try {
      const loading = await this.loadingController.create({ message: 'Logging in...' });
      await loading.present();
  
      // Attempt to sign in
      await this.authService.signIn(this.email, this.password);
  
      // Fetch user profile based on email
      this.userProfileService.getUserProfile(this.email).subscribe({
        next: (userProfile) => {
          if (!userProfile) {
            this.showAlert('Login Failed', 'User profile not found.');
            return;
          }
  
          // Handle different user statuses
          switch (userProfile.status) {
            case 'pending':
              this.showAlert('Login Failed', 'Your account is pending approval. Please wait for admin approval.');
              loading.dismiss(); // Dismiss loading indicator
              break;
            case 'blocked':
              this.showAlert('Login Failed', 'Your account is blocked. Please contact support for assistance.');
              loading.dismiss(); // Dismiss loading indicator
              break;
            case 'suspended':
              this.showAlert('Login Failed', 'Your account is suspended. Please contact support for assistance.');
              loading.dismiss(); // Dismiss loading indicator
              break;
            default:
              // Navigate to UserProfilePage on successful login
              this.router.navigate(['/dashboard-sp']);
              loading.dismiss(); // Dismiss loading indicator
              break;
          }
        },
        error: (error) => {
          console.error('Login error', error);
          this.showAlert('Login Failed', 'Please check your credentials and try again.');
          loading.dismiss(); // Dismiss loading indicator on error
        }
      });
  
    } catch (error) {
      console.error('Login error', error);
      this.showAlert('Login Failed', 'Please check your credentials and try again.');
    }
  }
  
  

  async register() {
    if (this.password !== this.confirmPassword) {
      this.showAlert('Registration Failed', 'Passwords do not match.');
      return;
    }

    if (this.images.length !== 5 || this.documents.length !== 5) {
      this.showAlert('Registration Failed', 'Please upload 5 images and 5 documents.');
      return;
    }

    const loading = await this.loadingController.create({ message: 'Registering...' });
    await loading.present();

    try {
      const userCredential = await this.authService.signUp(this.email, this.password);
      const userId = userCredential.user.uid;

      const imageUrls = await this.uploadFiles(userId, this.images, 'images');
      const documentUrls = await this.uploadFiles(userId, this.documents, 'documents');

      const userProfile = {
        email: this.email,
        userType: this.userType,
        status: 'pending',
        imageUrls,
        documentUrls,
      };

      if (this.userType === 'sp') {
        Object.assign(userProfile, {
          name: this.name,
          surname: this.surname,
          phoneNumber: this.phoneNumber,
          location: this.location,
          services: this.services,
        });
      } else if (this.userType === 'bm') {
        Object.assign(userProfile, {
          buildingName: this.buildingName,
          buildingType: this.buildingType,
          location: this.location,
          name: this.name,
          phoneNumber: this.phoneNumber,
        });
      }

      await this.userProfileService.updateUserProfile(userId, userProfile);
      
      // Add user data to Firestore
      await this.firestore.collection('users').doc(userId).set(userProfile);

      this.showAlert('Registration Successful', 'Your account is pending approval.');
      this.isLogin = true; // Switch back to login form
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
          return of(''); // Return an Observable of empty string if upload fails
        })
      )
    );

    try {
      const uploadedUrls = await forkJoin(uploadObservables).toPromise();
      return (uploadedUrls || []).filter(url => url !== '');
    } catch (error) {
      console.error('Error in uploadFiles:', error);
      return []; // Return an empty array if the entire process fails
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
    if (files.length > 5) {
      this.showAlert('Upload Error', 'Please select only 5 documents.');
      return;
    }
    this.documents = Array.from(files);
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
