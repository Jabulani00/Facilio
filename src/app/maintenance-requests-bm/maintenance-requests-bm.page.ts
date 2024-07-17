import { Component, OnInit } from '@angular/core';
import { MaintenanceRequestService } from '../services/maintenance-request.service';
import { FileStorageService } from '../services/file-storage.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-maintenance-requests-bm',
  templateUrl: './maintenance-requests-bm.page.html',
  styleUrls: ['./maintenance-requests-bm.page.scss'],
})
export class MaintenanceRequestsBmPage implements OnInit {
  maintenance = {
    type: '',
    description: '',
    floor: '',
    room: '',
    status: 'pending',
    images: [] as string[],
    bm_email: ''
  };

  maintenanceTypes = [
    'Plumbing Issues',
    'Electrical Issues',
    'HVAC Issues',
    'Structural Issues',
    'Appliance Issues',
    'Safety Issues',
    'General Maintenance',
    'Water Damage'
  ];

  constructor(
    private maintenanceRequestService: MaintenanceRequestService,
    private fileStorageService: FileStorageService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.maintenance.bm_email = user.email ?? '';
      }
    });
  }

  async submitRequest() {
    if (!this.isFormValid()) {
      this.showAlert('Invalid Form', 'Please fill in all required fields.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Submitting request...',
    });
    await loading.present();

    try {
      // Create the request with image URLs included
      await this.maintenanceRequestService.createRequest(this.maintenance);
      loading.dismiss();
      this.showAlert('Success', 'Maintenance request submitted successfully!');
      this.clearForm();
    } catch (error) {
      loading.dismiss();
      this.showAlert('Error', 'Failed to submit maintenance request. Please try again.');
      console.error('Error submitting maintenance request:', error);
    }
  }

  async uploadFiles(event: any) {
    const files = event.target.files;
    if (files.length === 0) return;

    const loading = await this.loadingController.create({
      message: 'Uploading files...',
    });
    await loading.present();

    const filePromises = [];
    for (let file of files) {
      const uploadObservable = this.fileStorageService.uploadFile(file, 'maintenance-requests');
      const filePromise = uploadObservable.toPromise().then(downloadURL => {
        if (downloadURL) {
          this.maintenance.images.push(downloadURL);
        }
      }).catch(error => {
        console.error('Error uploading file:', error);
      });
      filePromises.push(filePromise);
    }

    try {
      await Promise.all(filePromises);
      loading.dismiss();
      this.showAlert('Success', 'All files uploaded successfully!');
    } catch (error) {
      loading.dismiss();
      this.showAlert('Error', 'Failed to upload some files. Please try again.');
      console.error('Error uploading files:', error);
    }
  }

  private isFormValid(): boolean {
    return this.maintenance.type !== '' &&
           this.maintenance.description !== '' &&
           this.maintenance.floor !== '' &&
           this.maintenance.room !== '';
  }

  private clearForm() {
    this.maintenance = {
      type: '',
      description: '',
      floor: '',
      room: '',
      status: 'pending',
      images: [],
      bm_email: ''
    };
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
