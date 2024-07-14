import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  users: any[] = [];
  selectedUser: any = null;

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.firestore.collection('users').valueChanges({ idField: 'id' }).subscribe((users: any[]) => {
      this.users = users;
    });
  }

  async openUserDetails(user: any) {
    this.selectedUser = user;
    const modal = await this.modalController.create({
      component: 'ion-modal',
      componentProps: { user: this.selectedUser }
    });
    return await modal.present();
  }

  async closeModal() {
    this.selectedUser = null;
    await this.modalController.dismiss();
  }

  async changeUserStatus(userId: string, status: string) {
    try {
      await this.firestore.collection('users').doc(userId).update({ status });
      this.showAlert('Success', `User status updated to ${status}.`);
    } catch (error) {
      console.error('Error updating user status:', error);
      this.showAlert('Error', 'Failed to update user status.');
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
