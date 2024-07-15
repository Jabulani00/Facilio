import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { UserProfileService } from '../services/user-profile.service';
import { FileStorageService } from '../services/file-storage.service';
import emailjs from 'emailjs-com';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  userTypeFilter: string = 'all';
  statusFilter: string = 'all';
  searchTerm: string = '';
  isFileModalOpen = false;
  currentFiles: string[] = [];
  fileViewerType: 'image' | 'document' = 'image';

  totalUsers: number = 0;
  activeUsers: number = 0;
  pendingUsers: number = 0;

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController,
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
        this.updateUserCounts();
        this.applyFilters();
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error fetching users', error);
        loading.dismiss();
      }
    });
  }

  updateUserCounts() {
    this.totalUsers = this.users.length;
    this.activeUsers = this.users.filter(u => u.status === 'approved').length;
    this.pendingUsers = this.users.filter(u => u.status === 'pending').length;
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesUserType = this.userTypeFilter === 'all' || user.userType === this.userTypeFilter;
      const matchesStatus = this.statusFilter === 'all' || user.status === this.statusFilter;
      const matchesSearch = user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            (user.name && user.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      return matchesUserType && matchesStatus && matchesSearch;
    });
  }

  async changeUserStatus(user: any, newStatus: string) {
    const loading = await this.loadingController.create({ message: 'Updating status...' });
    await loading.present();

    this.firestore.collection('users').doc(user.id).update({ status: newStatus }).then(async () => {

      

      console.log('Email successfully sent');
      loading.dismiss();
      this.showAlert('Status Updated', 'User status has been updated successfully.');
      user.status = newStatus;

      const emailParams = {
        name: user.name,
        email_to: user.email,
        from_email: 'Facilio',
        subject: 'Facilio Account',
        message: 'This email is to inform you that your account has been  ' + newStatus
      };
  
      await emailjs.send('service_8ept2vs', 'template_315hlk4', emailParams, '14hVEtErTwfVvDBtn');
      this.updateUserCounts();
    }).catch(error => {
      console.error('Error updating status', error);
      loading.dismiss();
      this.showAlert('Update Failed', 'An error occurred while updating the status.');
    });
  }

  viewFiles(files: string[], type: 'image' | 'document') {
    this.currentFiles = files;
    this.fileViewerType = type;
    this.isFileModalOpen = true;
  }

  closeFileModal() {
    this.isFileModalOpen = false;
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