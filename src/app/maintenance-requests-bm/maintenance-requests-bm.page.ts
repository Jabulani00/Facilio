import { Component, OnInit } from '@angular/core';
import { MaintenanceRequestService } from '../services/maintenance-request.service';
import { FileStorageService } from '../services/file-storage.service';

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
    images: [] as string[]
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
    private fileStorageService: FileStorageService
  ) {}

  ngOnInit(): void {
    // Initialization logic if any
  }

  async submitRequest() {
    try {
      const docRef = await this.maintenanceRequestService.createRequest(this.maintenance);
      console.log('Maintenance request submitted!');
      if (this.maintenance.images.length > 0) {
        const saveImagePromises = this.maintenance.images.map(imageUrl =>
          this.maintenanceRequestService.saveImageUrl(docRef.id, imageUrl)
        );
        await Promise.all(saveImagePromises);
        console.log('Image URLs saved successfully!');
      }
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
    }
  }

  async uploadFiles(event: any) {
    const files = event.target.files;
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
      console.log('All files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }
}
