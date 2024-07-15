import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserProfileService } from '../services/user-profile.service';
import { FileStorageService } from '../services/file-storage.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  users: any[] = [];
  isImageModalOpen = false;
  isDocumentModalOpen = false;
  currentFiles: string[] = [];

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private userProfileService: UserProfileService,
    private fileStorageService: FileStorageService
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    const loading = await this.loadingController.create({ message: 'Fetching users...' });
    await loading.present();

    this.firestore.collection('users').valueChanges({ idField: 'id' }).subscribe({
      next: async (users: any[]) => {
        this.users = users;
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error fetching users', error);
        loading.dismiss();
      }
    });
  }

  async changeUserStatus(user: any) {
    const loading = await this.loadingController.create({ message: 'Updating status...' });
    await loading.present();

    this.firestore.collection('users').doc(user.id).update({ status: user.status }).then(() => {
      loading.dismiss();
      this.showAlert('Status Updated', 'User status has been updated successfully.');
    }).catch(error => {
      console.error('Error updating status', error);
      loading.dismiss();
      this.showAlert('Update Failed', 'An error occurred while updating the status.');
    });
  }

  async viewImages(imageUrls: string[]) {
    this.currentFiles = imageUrls;
    this.isImageModalOpen = true;
  }

  async viewDocuments(documentUrls: string[]) {
    this.currentFiles = documentUrls;
    this.isDocumentModalOpen = true;
  }

  closeModal() {
    this.isImageModalOpen = false;
    this.isDocumentModalOpen = false;
    this.currentFiles = [];
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
