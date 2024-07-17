import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MaintenanceRequestService } from '../services/maintenance-request.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss'],
})
export class RequestModalComponent {
  @Input() request: any;
  amount: string = ''; // Initialize with an empty string
  selectedDate: string = ''; // Initialize with an empty string

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private maintenanceRequestService: MaintenanceRequestService
  ) {}

  async deal() {
    try {
      await this.maintenanceRequestService.updateRequestByIdAndEmail(this.request.id, this.request.serviceProvider.email, {
        amount: this.amount,
        date: this.selectedDate
      });
      this.showAlert('Success', 'Offer has been updated');
      this.modalController.dismiss();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }

  async noDeal() {
    try {
      await this.maintenanceRequestService.updateRequestByIdAndEmail(this.request.id, this.request.serviceProvider.email, {
        status: 'rejected'
      });
      this.showAlert('Success', 'Offer has been rejected');
      this.modalController.dismiss();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }

  closeModal() {
    this.modalController.dismiss();
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
