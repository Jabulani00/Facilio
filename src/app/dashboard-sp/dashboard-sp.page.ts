import { Component, OnInit } from '@angular/core';
import { MaintenanceRequestService } from '../services/maintenance-request.service';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-sp',
  templateUrl: './dashboard-sp.page.html',
  styleUrls: ['./dashboard-sp.page.scss'],
})
export class DashboardSpPage implements OnInit {
  maintenanceRequests: any[] = [];

  constructor(
    private modalController: ModalController,
    private maintenanceRequestService: MaintenanceRequestService
  ) {}

  ngOnInit(): void {
    this.fetchMaintenanceRequests();
  }

  async fetchMaintenanceRequests() {
    this.maintenanceRequestService.getRequests().subscribe((requests: any[]) => {
      this.maintenanceRequests = requests.map(request => ({
        ...request,
        images: request.images || [], // Ensure images field is included
        email: request.email || '' // Ensure email field is included
      }));
    });
  }

  async openRequestModal(request: any) {
    console.log('Opening request modal with request:', request); // Debug log
    const modal = await this.modalController.create({
      component: ExploreContainerComponent,
      componentProps: {
        request: request
      }
    });
    return await modal.present();
  }
}
