import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';


interface UserData {
  email: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  location?: string;
  services?: string;
  buildingName?: string;
  buildingType?: string;
  status: string;
  imageUrls: string[];
  documentUrls: string[];
  userType: 'sp' | 'bm';
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit, OnDestroy {
  userData: UserData | null = null;
  currentUser: firebase.User | null = null;
  authSubscription: Subscription | undefined;
  isEditMode = false;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async loadUserProfile() {
    const loading = await this.loadingController.create({ message: 'Loading profile...' });
    await loading.present();

    try {
      this.authSubscription = this.afAuth.authState.subscribe(async user => {
        if (user) {
          this.currentUser = user;
          const userDocRef = this.firestore.collection('users').doc(user.uid);
          const userDocSnapshot = await userDocRef.get().toPromise();

          if (userDocSnapshot && userDocSnapshot.exists) {
            this.userData = userDocSnapshot.data() as UserData;
          } else {
            this.showAlert('Profile Error', 'User profile not found.');
          }
        } else {
          this.currentUser = null;
          this.userData = null;
          this.showAlert('Authentication Error', 'User not authenticated.');
        }
        loading.dismiss();
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.showAlert('Error', 'Failed to load user profile.');
      loading.dismiss();
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

  openLightbox(imageUrl: string) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
    
    if (lightbox && lightboxImg) {
      lightboxImg.src = imageUrl;
      lightbox.style.display = 'flex';
    }
  }
  
  closeLightbox(event: Event) {
    event.stopPropagation();
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.style.display = 'none';
    }
  }

  toggleEditMode() {
    if (this.isEditMode) {
      this.saveChanges();
    }
    this.isEditMode = !this.isEditMode;
  }

  async saveChanges() {
    if (!this.currentUser || !this.userData) {
      this.showAlert('Error', 'User not authenticated or profile data missing.');
      return;
    }

    const loading = await this.loadingController.create({ message: 'Saving changes...' });
    await loading.present();

    try {
      await this.firestore.collection('users').doc(this.currentUser.uid).update(this.userData);
      this.showAlert('Success', 'Profile updated successfully.');
    } catch (error) {
      console.error('Error updating user data:', error);
      this.showAlert('Error', 'Failed to update profile.');
    } finally {
      loading.dismiss();
    }
  }

  async uploadImage(event: any) {
    if (!this.currentUser || !this.userData) {
      this.showAlert('Error', 'User not authenticated or profile data missing.');
      return;
    }

    const file = event.target.files[0];
    if (file) {
      const loading = await this.loadingController.create({ message: 'Uploading image...' });
      await loading.present();

      try {
        const fileName = `${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(fileName);
        const task = this.storage.upload(fileName, file);
        
        const uploadResult = await task;
        const downloadUrl = await uploadResult.ref.getDownloadURL();
        
        if (!this.userData.imageUrls) {
          this.userData.imageUrls = [];
        }
        this.userData.imageUrls.push(downloadUrl);
        
        await this.firestore.collection('users').doc(this.currentUser.uid).update({
          imageUrls: this.userData.imageUrls
        });
        
        this.showAlert('Success', 'Image uploaded successfully.');
      } catch (error) {
        console.error('Error uploading image:', error);
        this.showAlert('Error', 'Failed to upload image.');
      } finally {
        loading.dismiss();
      }
    }
  }

  deleteImage(index: number) {
    if (this.userData && this.userData.imageUrls) {
      this.userData.imageUrls.splice(index, 1);
    }
  }

  async addDocument() {
    const alert = await this.alertController.create({
      header: 'Add Document',
      inputs: [
        {
          name: 'documentUrl',
          type: 'text',
          placeholder: 'Enter document URL'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.documentUrl && this.userData) {
              if (!this.userData.documentUrls) {
                this.userData.documentUrls = [];
              }
              this.userData.documentUrls.push(data.documentUrl);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  deleteDocument(index: number) {
    if (this.userData && this.userData.documentUrls) {
      this.userData.documentUrls.splice(index, 1);
    }
  }
}